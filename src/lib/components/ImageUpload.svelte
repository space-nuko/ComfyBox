<script lang="ts">
 import { createEventDispatcher } from "svelte";
 import { Block, BlockLabel, Empty } from "@gradio/atoms";
 import { File as FileIcon } from "@gradio/icons";
 import { ModifyUpload, Upload, blobToBase64, normalise_file } from "@gradio/upload";
 import type { FileData as GradioFileData } from "@gradio/upload";
 import UploadText from "$lib/components/gradio/app/UploadText.svelte";
 import { tick } from "svelte";
 import notify from "$lib/notify";
 import type { ComfyUploadImageAPIResponse } from "$lib/utils";

 export let value: GradioFileData[] | null = null;
 export let isMobile: boolean = false;
 export let imgWidth: number = 0;
 export let imgHeight: number = 0;
 export let imgElem: HTMLImageElement | null = null
 export let fileCount: "single" | "multiple" = "single"
 export let elem_classes: string[] = []
 export let style: string = ""
 export let label: string = ""
 // let propsChanged: Writable<number> | null = null;
 let dragging = false;
 let pending_upload = false;
 let old_value: Array<GradioFileData> | null = null;

 let _value: GradioFileData[] | null = null;
 const root = "comf"
 const root_url = "https//ComfyUI!"

	const dispatch = createEventDispatcher<{
		change: GradioFileData[];
		upload: undefined;
		clear: undefined;
	}>();

 $: _value = normalise_file(value, root, root_url);

 $: if (!(_value && _value.length > 0 && imgElem)) {
     imgWidth = 1
     imgHeight = 1
 }

 function onChange() {
     value = _value || []
     dispatch("change", value)
 }

 function onUpload() {
     dispatch("upload")
 }

 function onClear() {
     dispatch("clear")
 }

 interface GradioUploadResponse {
     error?: string;
     files?: Array<string>;
 }

 async function upload_files(root: string, files: Array<File>): Promise<GradioUploadResponse> {
     console.debug("UPLOADILFES", root, files);

     const url = `http://${location.hostname}:8188` // TODO make configurable

     const requests = files.map(async (file) => {
         const formData = new FormData();
         formData.append("image", file, file.name);
         return fetch(new Request(url + "/upload/image", {
             body: formData,
             method: 'POST'
         }))
         .then(r => r.json())
         .catch(error => error);
     });

     return Promise.all(requests)
                   .then( (results) => {
                       const errors = []
                       const files = []

                       for (const r of results) {
                           if (r instanceof Error) {
                               errors.push(r.cause)
                           }
                           else {
                               // bare filename of image
                               files.push((r as ComfyUploadImageAPIResponse).name)
                           }
                       }

                       let error = null;
                       if (errors && errors.length > 0)
                           error = "Upload error(s):\n" + errors.join("\n");

                       return { error, files }
                   })
 }

 $: {
     if (JSON.stringify(_value) !== JSON.stringify(old_value)) {
         pending_upload = true;

         old_value = _value;

         if (_value == null)
             _value = []
         else if (!Array.isArray(_value))
             _value = [_value]

         const allBlobs = _value.map((file_data: GradioFileData) => file_data.blob)

         if (allBlobs == null || allBlobs.length === 0) {
             _value = null;
             onChange();
             pending_upload = false;
         }
         else if (!allBlobs.every(b => b != null)) {
             _value = null;
             pending_upload = false;
         }
         else {
             let files = (Array.isArray(_value) ? _value : [_value]).map(
                 (file_data) => file_data.blob!
             );
             let upload_value = _value;
             pending_upload = true;
             upload_files(root, files).then((response) => {
                 if (JSON.stringify(upload_value) !== JSON.stringify(_value)) {
                     // value has changed since upload started
                     console.error("[ImageUpload] value has changed since upload started", upload_value, _value)
                     return;
                 }

                 pending_upload = false;
                 _value.forEach(
                     (file_data: GradioFileData, i: number) => {
                         if (response.files) {
                             file_data.orig_name = file_data.name;
                             file_data.name = response.files[i];
                             file_data.is_file = true;
                         }
                     }
                 );

                 if (response.error) {
                     notify(response.error, { type: "error" })
                 }

                 value = normalise_file(_value, root, root_url) as GradioFileData[];
                 onChange();
                 onUpload();
             });
         }
     }
 }

 async function handle_upload({ detail }: CustomEvent<GradioFileData | Array<GradioFileData>>) {
     _value = Array.isArray(detail) ? detail : [detail];
     await tick();
     onChange();
     onUpload();
 }

 function handle_clear(_e: CustomEvent<null>) {
     _value = null;
     onChange();
     onClear();
 }

 function getImageUrl(image: GradioFileData) {
     const baseUrl = `http://${location.hostname}:8188` // TODO make configurable
     const params = new URLSearchParams({ filename: image.name, subfolder: "", type: "input" })
     return `${baseUrl}/view?${params}`
 }
</script>

<div class="image-upload" {style}>
    {#if value}
        <Block
            visible={true}
            variant={(value === null || value.length === 0) ? "dashed" : "solid"}
            border_mode={dragging ? "focus" : "base"}
            padding={true}
            elem_id="comfy-image-upload-block"
            {elem_classes}
        >
            <BlockLabel
                label={label}
                show_label={label != ""}
                Icon={FileIcon}
                float={label != ""}
            />
            {#if _value && _value.length > 0 && !pending_upload}
                {@const firstImage = _value[0]}
                <ModifyUpload on:clear={handle_clear} absolute />
                <img src={getImageUrl(firstImage)}
                     alt={firstImage.orig_name}
                     bind:this={imgElem}
                     bind:naturalWidth={imgWidth}
                     bind:naturalHeight={imgHeight}
                />
            {:else}
                <Upload
                    file_count={fileCount}
                    filetype="image/*"
                    on:change={({ detail }) => (value = detail)}
                    on:load={handle_upload}
                    bind:dragging
                    on:clear
                    on:select
                    parse_to_data_url={false}
                    >
                    <UploadText type="file" />
                </Upload>
            {/if}
        </Block>
    {/if}
</div>

<style lang="scss">
 .image-upload {
     height: var(--size-96);

     :global(.block) {
         height: inherit;
         padding: 0;
         border-radius: 0;
     }

     img {
         width: 100%;
         height: 100%;
         max-width: 100%;
         max-height: 100%;
         object-fit: contain;
     }
 }
</style>
