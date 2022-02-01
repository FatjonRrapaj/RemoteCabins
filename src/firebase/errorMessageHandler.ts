const generalErrorMessage = "We're sorry, there was an unexpected problem that will be fixed soon!";

//TOOD: replace null userFriendlyMessages with correct ones

const authErrorMessages: {
  [key: string]: { internalDescription: string; userFriendlyDescription: string | null };
} = {
  'auth/app-deleted': {
    internalDescription: 'Thrown if the instance of FirebaseApp has been deleted.',
    userFriendlyDescription: generalErrorMessage,
  },
  'auth/app-not-authorized': {
    internalDescription:
      "Thrown if the app identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
    userFriendlyDescription:
      "You do not have access to view this content, but it's probably on us and we're working on it.",
  },
  'auth/argument-error': {
    internalDescription: 'Thrown if a method is called with incorrect arguments',
    userFriendlyDescription: generalErrorMessage,
  },
  'auth/invalid-api-key': {
    internalDescription:
      'Thrown if the provided API key is invalid. Please check that you have copied it correctly from the Firebase Console.',
    userFriendlyDescription: generalErrorMessage,
  },
  'auth/invalid-user-token': {
    internalDescription:
      "Thrown if the user's credential is no longer valid. The user must sign in again.",
    userFriendlyDescription: 'A problem occurred, re-logging you in again',
  },
  'auth/invalid-tenant-id': {
    internalDescription: 'Thrown if the tenant ID provided is invalid.',
    userFriendlyDescription: generalErrorMessage,
  },
  'auth/network-request-failed': {
    internalDescription:
      'Thrown if a network error (such as timeout, interrupted connection or unreachable host) has occurred.',
    userFriendlyDescription: 'Failed to proceed with your request, please try again.',
  },
  'auth/operation-not-allowed': {
    internalDescription:
      'Thrown if you have not enabled the provider in the Firebase Console. Go to the Firebase Console for your project, in the Auth section and the Sign in Method tab and configure the provider.',
    userFriendlyDescription: generalErrorMessage,
  },
  'auth/requires-recent-login': {
    internalDescription:
      "Thrown if the user's last sign-in time does not meet the security threshold. Use firebase.User.reauthenticateWithCredential to resolve. This does not apply if the user is anonymous.",
    //TODO: this descripton should not be displayed as the user will be re-logged in again
    userFriendlyDescription: 'A problem occurred, re-logging you in',
  },
  'auth/too-many-requests': {
    internalDescription:
      'Thrown if requests are blocked from a device due to unusual activity. Trying again after some delay would unblock',
    userFriendlyDescription: 'We cannot proceed with your request now, please try a bit later',
  },
  'auth/unauthorized-domain': {
    internalDescription:
      'Thrown if the app domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console',
    userFriendlyDescription: generalErrorMessage,
  },
  'auth/user-disabled': {
    internalDescription:
      'Thrown if the user account has been disabled by an administrator. Accounts can be enabled or disabled in the Firebase Console, the Auth section and Users subsection.',
    userFriendlyDescription: 'You do not have access to view this content.',
  },
  'auth/user-token-expired': {
    internalDescription:
      "Thrown if the user's credential has expired. This could also be thrown if a user has been deleted. Prompting the user to sign in again should resolve this for either case.",
    userFriendlyDescription: 'A problem occurred, please sign out and sign in again.',
  },
  'auth/web-storage-unsupported': {
    internalDescription:
      'Thrown if the browser does not support web storage or if the user disables them.',
    userFriendlyDescription:
      "Please enable web storage on your browser if you've disabled it, otherwise please visit the amazing content of this site from another web browser.",
    //todo: include visiting a link like: https://mid.as/kb/00103/enable-disable-or-clear-web-storage-cache
  },
  'auth/claims-too-large': {
    internalDescription:
      'The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes.',
    userFriendlyDescription: generalErrorMessage,
  },
  'auth/email-already-exists': {
    internalDescription:
      'The provided email is already in use by an existing user. Each user must have a unique email.',
    userFriendlyDescription: 'The provided email is already in use by an existing user.',
  },
  'auth/id-token-expired': {
    internalDescription: 'The provided Firebase ID token is expired.',
    //TODO: this descripton should not be displayed as the user will be re-logged in again
    userFriendlyDescription: 'A problem occurred, re-logging you in',
  },
  'auth/id-token-revoked': {
    internalDescription: 'The provided Firebase ID token is expired.',
    //TODO: this descripton should not be displayed as the user will be re-logged in again if that's the case
    userFriendlyDescription: 'A problem occurred, re-logging you in',
  },
  'auth/insufficient-permission': {
    internalDescription:
      'The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. Refer to Set up a Firebase project for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs.',
    userFriendlyDescription: generalErrorMessage,
  },
  'auth/internal-error': {
    internalDescription:
      'The Authentication server encountered an unexpected error while trying to process the request. The error message should contain the response from the Authentication server containing additional information. If the error persists, please report the problem to our Bug Report support channel.',
    userFriendlyDescription: generalErrorMessage,
  },
  'auth/invalid-argument': {
    internalDescription:
      'An invalid argument was provided to an Authentication method. The error message should contain additional information.',
    userFriendlyDescription: null,
  },
  'auth/invalid-claims': {
    internalDescription:
      'The custom claim attributes provided to setCustomUserClaims() are invalid.',
    userFriendlyDescription: null,
  },
  'auth/invalid-continue-uri': {
    internalDescription: 'The continue URL must be a valid URL string.',
    userFriendlyDescription: null,
  },
  'auth/invalid-creation-time': {
    internalDescription: 'The creation time must be a valid UTC date string.',
    userFriendlyDescription: null,
  },
  'auth/invalid-credential': {
    internalDescription:
      'The credential used to authenticate the Admin SDKs cannot be used to perform the desired action. Certain Authentication methods such as createCustomToken() and verifyIdToken() require the SDK to be initialized with a certificate credential as opposed to a refresh token or Application Default credential. See Initialize the SDK for documentation on how to authenticate the Admin SDKs with a certificate credential.',
    userFriendlyDescription: null,
  },
  'auth/invalid-disabled-field': {
    internalDescription:
      'The provided value for the disabled user property is invalid. It must be a boolean.',
    userFriendlyDescription: null,
  },
  'auth/invalid-display-name': {
    internalDescription:
      'The provided value for the displayName user property is invalid. It must be a non-empty string.',
    userFriendlyDescription: null,
  },
  'auth/invalid-dynamic-link-domain': {
    internalDescription:
      'The provided dynamic link domain is not configured or authorized for the current project.',
    userFriendlyDescription: null,
  },
  'auth/invalid-email': {
    internalDescription:
      'The provided value for the email user property is invalid. It must be a string email address',
    userFriendlyDescription: null,
  },
  'auth/invalid-email-verified': {
    internalDescription:
      'The provided value for the emailVerified user property is invalid. It must be a boolean.',
    userFriendlyDescription: null,
  },
  'auth/invalid-hash-algorithm': {
    internalDescription:
      'The hash algorithm must match one of the strings in the list of supported algorithms.',
    userFriendlyDescription: null,
  },
  'auth/invalid-hash-block-size': {
    internalDescription: 'The hash block size must be a valid number',
    userFriendlyDescription: null,
  },
  'auth/invalid-hash-derived-key-length': {
    internalDescription: 'The hash derived key length must be a valid number.',
    userFriendlyDescription: null,
  },
  'auth/invalid-hash-key': {
    internalDescription: 'The hash key must a valid byte buffer.',
    userFriendlyDescription: null,
  },
  'auth/invalid-hash-memory-cost': {
    internalDescription: 'The hash memory cost must be a valid number.',
    userFriendlyDescription: null,
  },
  'auth/invalid-hash-parallelization': {
    internalDescription: 'The hash parallelization must be a valid number. ',
    userFriendlyDescription: null,
  },
  'auth/invalid-hash-rounds': {
    internalDescription: 'The hash rounds must be a valid number.',
    userFriendlyDescription: null,
  },
  'auth/invalid-hash-salt-separator': {
    internalDescription: 'The hashing algorithm salt separator field must be a valid byte buffer.',
    userFriendlyDescription: null,
  },
  'auth/invalid-id-token': {
    internalDescription: 'The provided ID token is not a valid Firebase ID token.',
    userFriendlyDescription: null,
  },
  'auth/invalid-last-sign-in-time': {
    internalDescription: 'The last sign-in time must be a valid UTC date string.',
    userFriendlyDescription: null,
  },
  'auth/invalid-page-token': {
    internalDescription:
      'The provided next page token in listUsers() is invalid. It must be a valid non-empty string.',
    userFriendlyDescription: null,
  },
  'auth/invalid-password': {
    internalDescription:
      'The provided value for the password user property is invalid. It must be a string with at least six characters.',
    userFriendlyDescription: null,
  },
  'auth/invalid-password-hash': {
    internalDescription: 'The password hash must be a valid byte buffer.',
    userFriendlyDescription: null,
  },
  'auth/invalid-password-salt': {
    internalDescription: 'The password salt must be a valid byte buffer',
    userFriendlyDescription: null,
  },
  'auth/invalid-phone-number': {
    internalDescription:
      'The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.   ',
    userFriendlyDescription: null,
  },
  'auth/invalid-photo-url': {
    internalDescription:
      'The provided value for the photoURL user property is invalid. It must be a string URL.',
    userFriendlyDescription: null,
  },
  'auth/invalid-provider-data': {
    internalDescription: 'The providerData must be a valid array of UserInfo objects. ',
    userFriendlyDescription: null,
  },
  'auth/invalid-provider-id': {
    internalDescription: 'The providerId must be a valid supported provider identifier string.',
    userFriendlyDescription: null,
  },
  'auth/invalid-oauth-responsetype': {
    internalDescription: 'Only exactly one OAuth responseType should be set to true.',
    userFriendlyDescription: null,
  },
  'auth/invalid-session-cookie-duration': {
    internalDescription:
      'The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.',
    userFriendlyDescription: null,
  },
  'auth/invalid-uid': {
    internalDescription:
      'The provided uid must be a non-empty string with at most 128 characters. ',
    userFriendlyDescription: null,
  },
  'auth/invalid-user-import': {
    internalDescription: 'The user record to import is invalid.',
    userFriendlyDescription: null,
  },
  'auth/maximum-user-count-exceeded': {
    internalDescription: 'The maximum allowed number of users to import has been exceeded.',
    userFriendlyDescription: null,
  },
  'auth/missing-android-pkg-name': {
    internalDescription:
      'An Android Package Name must be provided if the Android App is required to be installed.',
    userFriendlyDescription: null,
  },
  'auth/missing-continue-uri': {
    internalDescription: 'A valid continue URL must be provided in the request.',
    userFriendlyDescription: null,
  },
  'auth/missing-hash-algorithm': {
    internalDescription:
      'Importing users with password hashes requires that the hashing algorithm and its parameters be provided.',
    userFriendlyDescription: null,
  },
  'auth/missing-ios-bundle-id': {
    internalDescription: 'The request is missing a Bundle ID.',
    userFriendlyDescription: null,
  },
  'auth/missing-uid': {
    internalDescription: 'A uid identifier is required for the current operation.',
    userFriendlyDescription: null,
  },
  'auth/missing-oauth-client-secret': {
    internalDescription:
      'The OAuth configuration client secret is required to enable OIDC code flow.',
    userFriendlyDescription: null,
  },

  'auth/phone-number-already-exists': {
    internalDescription:
      'The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.   ',
    userFriendlyDescription: null,
  },
  'auth/project-not-found': {
    internalDescription:
      'No Firebase project was found for the credential used to initialize the Admin SDKs. Refer to Set up a Firebase project for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs.',
    userFriendlyDescription: null,
  },
  'auth/reserved-claims': {
    internalDescription:
      'One or more custom user claims provided to setCustomUserClaims() are reserved. For example, OIDC specific claims such as (sub, iat, iss, exp, aud, auth_time, etc) should not be used as keys for custom claims.',
    userFriendlyDescription: null,
  },
  'auth/session-cookie-expired': {
    internalDescription: 'The provided Firebase session cookie is expired.',
    userFriendlyDescription: null,
  },
  'auth/session-cookie-revoked': {
    internalDescription: 'The Firebase session cookie has been revoked.  ',
    userFriendlyDescription: null,
  },
  'auth/uid-already-exists': {
    internalDescription:
      'The provided uid is already in use by an existing user. Each user must have a unique uid.',
    userFriendlyDescription: null,
  },
  'auth/unauthorized-continue-uri': {
    internalDescription:
      'The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase Console.',
    userFriendlyDescription: null,
  },
  'auth/user-not-found': {
    internalDescription:
      'There is no existing user record corresponding to the provided identifier',
    userFriendlyDescription: null,
  },
};

//TOOD: replace null userFriendlyMessages with correct ones

const dbErrorMessages: {
  [key: string]: { internalDescription: string; userFriendlyDescription: string | null };
} = {
  'storage/unknown': {
    internalDescription: 'An unknown error occurred',
    userFriendlyDescription: null,
  },
  'storage/object-not-found': {
    internalDescription: 'No object exists at the desired reference.',
    userFriendlyDescription: null,
  },
  'storage/bucket-not-found': {
    internalDescription: 'No bucket is configured for Cloud Storage',
    userFriendlyDescription: null,
  },
  'storage/project-not-found': {
    internalDescription: 'No project is configured for Cloud Storage',
    userFriendlyDescription: null,
  },
  'storage/quota-exceeded': {
    internalDescription:
      "Quota on your Cloud Storage bucket has been exceeded. If you're on the no-cost tier, upgrade to a paid plan. If you're on a paid plan, reach out to Firebase support.",
    userFriendlyDescription: null,
  },
  'storage/unauthenticated': {
    internalDescription: 'User is unauthenticated, please authenticate and try again.',
    userFriendlyDescription: null,
  },
  'storage/unauthorized': {
    internalDescription:
      'User is not authorized to perform the desired action, check your security rules to ensure they are correct.',
    userFriendlyDescription: null,
  },
  'storage/retry-limit-exceeded': {
    internalDescription:
      'The maximum time limit on an operation (upload, download, delete, etc.) has been excceded. Try uploading again.',
    userFriendlyDescription: null,
  },
  'storage/invalid-checksum': {
    internalDescription:
      'File on the client does not match the checksum of the file received by the server. Try uploading again.',
    userFriendlyDescription: null,
  },
  'storage/canceled': {
    internalDescription: 'User canceled the operation.',
    userFriendlyDescription: null,
  },
  'storage/invalid-event-name': {
    internalDescription:
      'Invalid event name provided. Must be one of [`running`, `progress`, `pause`]',
    userFriendlyDescription: null,
  },
  'storage/invalid-url': {
    internalDescription:
      'Invalid URL provided to refFromURL(). Must be of the form: gs://bucket/object or https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=<TOKEN>',
    userFriendlyDescription: null,
  },
  'storage/invalid-argument': {
    internalDescription:
      'The argument passed to put() must be `File`, `Blob`, or `UInt8` Array. The argument passed to putString() must be a raw, `Base64`, or `Base64URL` string.',
    userFriendlyDescription: null,
  },
  'storage/no-default-bucket': {
    internalDescription: "No bucket has been set in your config's storageBucket property.",
    userFriendlyDescription: null,
  },
  'storage/cannot-slice-blob': {
    internalDescription:
      "Commonly occurs when the local file has changed (deleted, saved again, etc.). Try uploading again after verifying that the file hasn't changed.",
    userFriendlyDescription: null,
  },
  'storage/server-file-wrong-size': {
    internalDescription:
      'File on the client does not match the size of the file recieved by the server. Try uploading again.',
    userFriendlyDescription: null,
  },
};

function getStringValue(value: any): string {
  return String(value);
}

export function handleAuthErrorCode(code: any) {
  const key = getStringValue(code);
  const { internalDescription, userFriendlyDescription } = authErrorMessages[key];
  console.error('internal error description: ', internalDescription);
  console.error('userFriendly error description: ', userFriendlyDescription);
  if (userFriendlyDescription == null) {
    alert(internalDescription);
  } else {
    //complete the descriptions and remove the condition for great user experience!
    alert(userFriendlyDescription);
  }
}

export function handleDbErrorCode(code: any) {
  const key = getStringValue(code);
  const { internalDescription, userFriendlyDescription } = dbErrorMessages[key];
  console.error('internal error description: ', internalDescription);
  console.error('userFriendly error description: ', userFriendlyDescription);
  if (userFriendlyDescription == null) {
    alert(internalDescription);
  } else {
    //complete the descriptions and remove the condition for great user experience!
    alert(userFriendlyDescription);
  }
}
