// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthenticationService } from '../../authentication.service';

// export const authenticationGuard: 
// CanActivateFn = (route, state) => {
  
//   const router = inject(Router);
//   const authenticationService = inject(AuthenticationService);

//   const isAuthenticatedUser = authenticationService.isAuthenticatedUser();

//   //const isAuthenticatedPsychologist = authenticationService.isAuthenticatedPsychologist();

//   if(isAuthenticatedUser) {
//     return true;
//   }

//   if(router.url === 'account/sign-up-patient') {
//     router.navigate(['account/sign-in-patient']);
//     return false;
//   }

//   router.navigate(['account/sign-in-patient']);
//   return false;


// };


