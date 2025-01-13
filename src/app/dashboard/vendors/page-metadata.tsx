import { Metadata } from 'next';

import { config } from '@/config';

export const metadata = {
  title: `Vendors | Dashboard | ${config.site.name}`,
} satisfies Metadata;
