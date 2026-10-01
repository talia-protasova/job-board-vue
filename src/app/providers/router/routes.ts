import type { RouteRecordRaw } from 'vue-router';

import { JobDetailsPage } from '@/pages/job-details';
import { JobsPage } from '@/pages/jobs';
import { NotFoundPage } from '@/pages/not-found';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'jobs',
        component: JobsPage,
    },
    {
        path: '/jobs/:jobId',
        name: 'job-details',
        component: JobDetailsPage,
        props: true,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage,
    },
];
