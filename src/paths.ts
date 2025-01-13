export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    // signUp: '/auth/sign-up',
    // resetPassword: '/auth/reset-password',
  },
  dashboard: {
    overview: '/dashboard',
    posts: '/dashboard/posts',
    vendors: '/dashboard/vendors',
    viewPost: (id: string) => `/dashboard/${id}`,
  },
  errors: { notFound: '/errors/not-found' },
} as const;
