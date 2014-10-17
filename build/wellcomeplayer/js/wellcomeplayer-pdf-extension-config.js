{
    "options": {
        "theme": "coreplayer-default-theme",
        "preloadMoreInfo": false
    },
    "modules": {
        "genericDialogue": {
            "content": {
                "ok": "OK",
                "emptyValue": "please enter a value",
                "pageNotFound": "page not found",
                "sessionExpired": "Your session has expired, please refresh to log in again",
                "refresh": "Refresh"
            }
        },
        "helpDialogue": {
            "content": {
                "title": "Help",
                "text": "placeholder text"
            }
        },
        "embedDialogue": {
            "options": {
                "embedTemplate": "<div class=\"wellcomePlayer\" data-uri=\"{0}\" data-sequenceindex=\"{1}\" data-config=\"{2}\" style=\"width:{3}px; height:{4}px; background-color: #000\"></div>\n<script type=\"text/javascript\" id=\"embedWellcomePlayer\" src=\"{5}\"></script><script type=\"text/javascript\">/* wordpress fix */</script>"
            },
            "content": {
                "title": "Embed",
                "instructions": "To embed this item in your own website, copy and paste the code below:"
            }
        },
        "headerPanel": {
            "content": {
                "help": "Help",
                "close": "Close"
            }
        },
        "treeViewLeftPanel": {
            "options": {
                "panelCollapsedWidth": 30,
                "panelExpandedWidth": 255,
                "panelOpen": false,
                "panelAnimationDuration": 250,
                "thumbsEnabled": true,
                "treeEnabled": false,
                "thumbsExtraHeight": 6
            }
        },
        "pdfCenterPanel": {
            "options": {
                "titleEnabled": false
            },
            "content": {}
        },
        "moreInfoRightPanel": {
            "options": {
                "panelCollapsedWidth": 30,
                "panelExpandedWidth": 255,
                "panelAnimationDuration": 250
            },
            "content": {
                "holdingText": "Your module goes here!",
                "title": "Title",
                "credits": "Credits",
                "date": "Date",
                "physicalDescription": "Physical Description",
                "summary": "Summary",
                "reference": "Reference",
                "authors": "Author(s)",
                "edition": "Edition",
                "publicationDate": "Publication Date",
                "catalogueReference": "Catalogue Reference",
                "copyright": "Copyright",
                "conditions": "View full conditions of use",
                "viewCatalogueRecord": "View full catalogue record"
            }
        },
        "footerPanel": {
            "content": {
                "fullScreen": "Full Screen",
                "exitFullScreen": "Exit Full Screen",
                "embed": "Embed"
            }
        },
        "loginDialogue": {
            "options": {
                "forgotPasswordUri": "https://catalogue.wellcomelibrary.org/pinreset~S8",
                "registerUri": "https://catalogue.wellcomelibrary.org/selfreg",
                "termsUri": "/about-this-site/terms-and-conditions/ #contGroup .fluid-column",
                "acceptTermsUri": "/service/login/guestlogin"
            },
            "content": {
                "title": "Login",
                "usernameLabel": "Library card number or username:",
                "passwordLabel": "Password",
                "nextItem": "Next Visible Item",
                "forgotPassword": "Forgot password",
                "register": "Join the Library",
                "login": "Log in",
                "loginWith": "Log in with:",
                "signInWithLibraryAccount": "Sign in with Library account",
                "signInWithTwitter": "Sign in with Twitter",
                "signInWithFacebook": "Sign in with Facebook",
                "signInWithGoogle": "Sign in with Google",
                "signInWithOpenID": "Sign in with OpenID",
                "requiresRegistrationPermissionsMessage": "Log in to:<ul><li>save digitised items to your account</li><li>make notes about your saved items</li></ul>",
                "restrictedFilesPermissionsMessage": "You do not have permission to see restricted items.",
                "clinicalImagesPermissionsMessage": "Online access to clinical content is restricted to healthcare professionals. Please contact Wellcome Images (images@wellcome.ac.uk) for further information.<br/><br/>If you are a healthcare professional with login credentials, please log in.",
                "closedPermissionsMessage": "You do not have permission to see closed content.",
                "inadequatePermissionsMessage": "You do not have the correct permissions to view this item. Please continue to the next item or enter new credentials.",
                "loginExpiredMessage": "Your session has expired. Please log in again.",
                "defaultMessage": "Log in to:<ul><li>save digitised items to your account</li><li>make notes about your saved items</li></ul>",
                "viewTerms": "Read full terms and conditions",
                "acceptTerms": "Accept Terms and Open",
                "twitter": "Twitter",
                "facebook": "Facebook",
                "google": "Google",
                "openid": "OpenID",
                "loginAsGuestTitle": "Archival material less than 100 years old",
                "loginAsGuestText": "This digitised archival material is free to access. By accepting our terms and conditions, you agree to the following:<br/><br/>By viewing this and any subsequent archive material under 100 years old, I agree that I will use personal data on living persons for research purposes only. I will not use personal data to support decisions about the person who is the subject of the data, or in a way that causes substantial damage or distress to them."
            }
        },
        "downloadDialogue": {
            "content": {
                "title": "Download",
                "currentViewAsJpg": "Current view (jpg)",
                "wholeImageHighResAsJpg": "Whole image high res (jpg)",
                "wholeImageLowResAsJpg": "Whole image low res (jpg)",
                "entireDocumentAsPdf": "Entire document (pdf)",
                "entireFileAsOriginal": "Entire file ({0})",
                "preview": "Preview",
                "download": "Download"
            }
        },
        "extendedFooterPanel": {
            "content": {
                "save": "Save to Bookmarks",
                "download": "Download"
            }
        },
        "conditionsDialogue": {
            "content": {
                "title": "Conditions of use"
            }
        }
    },
    "extends": "src/extensions/coreplayer-pdf-extension/extension.config"
}