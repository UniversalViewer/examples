{
    "options": {
        "leftPanelEnabled": true,
        "preloadMoreInfo": true
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
                "thumbsEnabled": false
            }
        },
        "mediaelementCenterPanel": {
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
                "termsUri": "/terms.html",
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
                "signInWithTwitter": "Sign in with Twitter",
                "signInWithFacebook": "Sign in with Facebook",
                "signInWithGoogle": "Sign in with Google",
                "signInWithOpenID": "Sign in with OpenID",
                "requiresRegistrationPermissionsMessage": "You do not have permission to see restricted items.",
                "restrictedFilesPermissionsMessage": "You do not have permission to see restricted items.",
                "clinicalImagesPermissionsMessage": "Online access to clinical content is restricted to healthcare professionals. Please contact Wellcome Images (images@wellcome.ac.uk) for further information",
                "closedPermissionsMessage": "You do not have permission to see closed content.",
                "inadequatePermissionsMessage": "You do not have the correct permissions to view this item. Please continue to the next item or enter new credentials.",
                "loginExpiredMessage": "Your session has expired due to inactivity, please log in again.",
                "defaultMessage": "Archival material less than 100 years old requires registration and log in to view.",
                "viewTerms": "Full terms and conditions",
                "acceptTerms": "Accept Terms and Open",
                "twitter": "Twitter",
                "facebook": "Facebook",
                "google": "Google",
                "openid": "OpenID"
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
                "fullScreen": "Full Screen",
                "exitFullScreen": "Exit Full Screen",
                "save": "Save to Bookmarks",
                "download": "Download",
                "embed": "Embed"
            }
        }
    },
    "extends": "src/extensions/coreplayer-mediaelement-extension/extension.config"
}