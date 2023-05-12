import { toast } from "@zerodevx/svelte-toast";
import type { SvelteToastOptions } from "@zerodevx/svelte-toast/stores";
import { type Notification } from "framework7/components/notification"
import { f7 } from "framework7-svelte"

export type NotifyOptions = {
    title?: string,
    type?: "neutral" | "info" | "warning" | "error" | "success",
    imageUrl?: string,
    timeout?: number | null,
    showOn?: "web" | "native" | "all" | "none"
}

function notifyf7(text: string, options: NotifyOptions) {
    if (!f7)
        return;

    let closeTimeout = options.timeout
    if (closeTimeout === undefined)
        closeTimeout = 3000;

    const notification = f7.notification.create({
        title: options.title,
        titleRightText: 'now',
        // subtitle: 'Notification with close on click',
        text: text,
        closeOnClick: true,
        closeTimeout
    });
    notification.open();
}

function notifyToast(text: string, options: NotifyOptions) {
    const toastOptions: SvelteToastOptions = {
        dismissable: options.timeout !== null,
    }

    if (options.type === "success") {
        toastOptions.theme = {
            '--toastBackground': 'var(--color-green-600)',
        }
    }
    else if (options.type === "info") {
        toastOptions.theme = {
            '--toastBackground': 'var(--color-blue-500)',
        }
    }
    else if (options.type === "warning") {
        toastOptions.theme = {
            '--toastBackground': 'var(--color-yellow-500)',
        }
    }
    else if (options.type === "error") {
        toastOptions.theme = {
            '--toastBackground': 'var(--color-red-500)',
        }
    }

    toast.push(text, toastOptions);
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

    notification.onclick = () => window.focus();
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
