import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request:', req.method, req.url);
  
  const clonedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });
  
  return next(clonedReq);
};
