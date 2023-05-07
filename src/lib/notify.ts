import { toast } from "@zerodevx/svelte-toast";
import type { SvelteToastOptions } from "@zerodevx/svelte-toast/stores";
import { f7 } from "framework7-svelte"

let notification;

function notifyf7(text: string, title?: string) {
    if (!notification) {
        notification = f7.notification.create({
            title: title,
            titleRightText: 'now',
            // subtitle: 'Notification with close on click',
            text: text,
            closeOnClick: true,
            closeTimeout: 3000,
        });
    }
    // Open it
    notification.open();
}

function notifyToast(text: string, type?: string) {
    const options: SvelteToastOptions = {}

    if (type === "error") {
        options.theme = {
            '--toastBackground': 'var(--color-red-500)',
        }
    }

    toast.push(text, options);
}

export default function notify(text: string, title?: string, type?: string) {
    notifyf7(text, title);
    notifyToast(text, title);
}
