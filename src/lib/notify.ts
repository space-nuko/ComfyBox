import { toast } from "@zerodevx/svelte-toast";
import type { SvelteToastOptions } from "@zerodevx/svelte-toast/stores";
import { type Notification } from "framework7/components/notification"
import { f7 } from "framework7-svelte"
import OnClickToastItem from "$lib/components/OnClickToastItem.svelte"

export type NotifyOptions = {
    title?: string,
    type?: "neutral" | "info" | "warning" | "error" | "success",
    imageUrl?: string,
    timeout?: number | null,
    showOn?: "web" | "native" | "all" | "none",
    showBar?: boolean,
    onClick?: () => void,
}

function notifyf7(text: string, options: NotifyOptions) {
    if (!f7)
        return;

    console.error(options)
    let closeTimeout = options.timeout
    if (closeTimeout === undefined)
        closeTimeout = 3000;

    const on: Notification.Parameters["on"] = {}
    if (options.onClick) {
        on.click = () => options.onClick();
    }

    let icon = null;
    if (options.imageUrl) {
        icon = `<img src="${options.imageUrl}"/>`
    }

    const notification = f7.notification.create({
        title: options.title,
        titleRightText: 'now',
        // subtitle: 'Notification with close on click',
        text: text,
        closeOnClick: true,
        closeTimeout,
        on,
        icon
    });
    notification.open();
}

function notifyToast(text: string, options: NotifyOptions) {
    const toastOptions: SvelteToastOptions = {
        dismissable: options.timeout !== null,
        duration: options.timeout || 5000,
        theme: {},
    }

    if (options.showBar) {
        toastOptions.theme['--toastBarHeight'] = "6px"
    }

    if (options.type === "success") {
        toastOptions.theme['--toastBackground'] = 'var(--color-green-600)';
        toastOptions.theme['--toastBarBackground'] = 'var(--color-green-900)';
    }
    else if (options.type === "info") {
        toastOptions.theme['--toastBackground'] = 'var(--color-blue-500)';
        toastOptions.theme['--toastBarBackground'] = 'var(--color-blue-800)';
    }
    else if (options.type === "warning") {
        toastOptions.theme['--toastBackground'] = 'var(--color-yellow-600)';
        toastOptions.theme['--toastBarBackground'] = 'var(--color-yellow-900)';
    }
    else if (options.type === "error") {
        toastOptions.theme['--toastBackground'] = 'var(--color-red-500)';
        toastOptions.theme['--toastBarBackground'] = 'var(--color-red-800)';
    }

    if (options.onClick) {
        toast.push({
            component: {
                src: OnClickToastItem,
                props: {
                    message: text,
                    notifyOptions: options
                },
                sendIdTo: "toastID"
            },
            ...toastOptions
        })
    }
    else {
        toast.push(text, toastOptions);
    }
}

function notifyNative(text: string, options: NotifyOptions) {
    if (document.hasFocus())
        return;

    const title = options.title || "ComfyBox"
    const nativeOptions: NotificationOptions = {
        body: text,
    }

    if (options.imageUrl) {
        nativeOptions.icon = options.imageUrl
        nativeOptions.image = options.imageUrl
    }
    if (options.timeout === null) {
        nativeOptions.requireInteraction = true;
    }

    const notification = new Notification(title, nativeOptions);

    notification.onclick = () => {
        window.focus();
        if (options.onClick)
            options.onClick();
    }
}

export default function notify(text: string, options: NotifyOptions = {}) {
    const showOn = options.showOn || "web";

    if (showOn === "none")
        return;

    if (showOn === "all" || showOn === "web") {
        notifyf7(text, options);
        notifyToast(text, options);
    }

    if (showOn === "all" || showOn === "native") {
        notifyNative(text, options)
    }
}
