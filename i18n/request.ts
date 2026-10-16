import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales: string[] = ['en', 'id'];

export default getRequestConfig(async ({ locale }) => {
    const currentLocale = locale || 'en';

    if (!locales.includes(currentLocale)) notFound();

    return {
        locale: currentLocale,
        messages: (await import(`../messages/${currentLocale}.json`)).default
    };
});