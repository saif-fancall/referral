// require("dotenv").config();
// const express = require("express");
// const app = express();
// const axios = require("axios");
// const morgan = require("morgan");

// const API_URL = process.env.API_URL;

// console.log("API_URL", API_URL);

// const DEFAULT_FALLBACK_LINK = process.env.DEFAULT_FALLBACK_LINK;
// const httpClient = axios.create({
//   baseURL: API_URL,
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(morgan("dev"));

// app.get("/", async (req, res) => {
//   try {
//     const { link } = req.query;
//     console.log("link", link);
//     if (!link) {
//       throw new Error("where is link?");
//     }

//     const {
//       data: { data },
//     } = await httpClient.get(`/get-user-info-from-referral-link?link=${link}`);

//     let fullName = "";
//     if (data.first_name) fullName += data.first_name;
//     if (data.last_name) fullName += data.last_name;

//     const og_title = fullName || "Fancall user";
//     const og_url = process.env.DEFAULT_FALLBACK_LINK;
//     const og_type = "website";
//     const og_image =
//       data?.profile_image?.[0]?.profile_image_url ||
//       process.env.DEFAULT_PROFILE_IMAGE;

//     const html = getHtml({
//       link,
//       og_image,
//       og_title,
//       og_type,
//       og_url,
//     });

//     return res.send(html);
//   } catch (error) {
//     console.log("error is ", error);
//     res.send(getHtml({}));
//   }
// });

// const PORT = process.env.PORT || 3011;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// function getHtml(payload) {
//   const {
//     og_image = process.env.DEFAULT_PROFILE_IMAGE,
//     og_type = "website",
//     og_url = process.env.DEFAULT_FALLBACK_LINK,
//     og_title = payload.og_title || "Fancall User",
//     og_description = process.env.SOCIAL_DESCRIPTION,
//     link = "",
//   } = payload;

//   return `<!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta property="og:title" content="${og_title}" />
//     <meta name="twitter:title" content="${og_title}" />
//     <meta name="twitter:description" content="${og_description}" />
//     <meta property="og:description" content="${og_description}"/>
//     <meta property="og:url" content="${og_url}" />
//     <meta name="twitter:url" content="${og_url}" />
//     <meta property="og:type" content="${og_type}" />
//     <meta property="og:image" content="${og_image}" />
//     <meta property="og:image:alt" content="profile_image" />
//     <meta property="fb:app_id" content="${process.env.FACEBOOK_ID}" />
//     <meta name="author" content="${og_title}">
//     <meta name="publish_date" property="og:publish_date" content="${new Date().toISOString()}">

//     <title>Fancall</title>
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//         }

//         body {
//             display: grid;
//             background-color: #000000;
//             height: 100vh;
//             place-items: center;
//             overflow: hidden;
//             color: white;
//             width: auto;
//         }

//         .loader {
//             border: 16px solid #f3f3f3;
//             border-radius: 50%;
//             border-top: 16px solid #3498db;
//             width: 120px;
//             height: 120px;
//             -webkit-animation: spin 2s linear infinite;
//             /* Safari */
//             animation: spin 2s linear infinite;
//         }

//         /* Safari */
//         @-webkit-keyframes spin {
//             0% {
//                 -webkit-transform: rotate(0deg);
//             }

//             100% {
//                 -webkit-transform: rotate(360deg);
//             }
//         }

//         @keyframes spin {
//             0% {
//                 transform: rotate(0deg);
//             }

//             100% {
//                 transform: rotate(360deg);
//             }
//         }
//     </style>
// </head>

// <body>
//     <div>
//         <div class="loader"></div>
//         <span style="margin-top: 10px; display: inline-flex">
//             <b style="font-size: 2rem;">
//                 Redirecting you to FanCall app...
//             </b>
//         </span>
//     </div>
//     <script>
//         const urlParams = new URLSearchParams(window.location.search);
//         const refer_link = urlParams.get('link');
//         console.log(refer_link, 'refer_link');
//         const API_URL = '${API_URL}increment-link-click?link=${link}';
//         const ANDROID_PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.fancall.fancallapp'

//         function redirectToUrl(url) {
//             window.location = url;
//         }

//         const api_options = {
//             method: 'POST',
//             "Content-Type": "application/json",
//             body: JSON.stringify({
//                 link: refer_link
//             }),
//             'no-cors': true,
//             redirect: 'follow'
//         }
//         let redirect_url = 'https://fancall.in';
//         let user;
//         fetch(API_URL, api_options)
//             .then(res => res.json())
//             .then(({ data }) => {
//                 redirect_url = data.redirect_url
//                 user = data.user
//             })
//             .finally(() => {
//                 globalThis.location.href = redirect_url
//                 if(user) {
//                     const is_android = /android/i.test(navigator.userAgent.toLowerCase());
//                     if(!is_android) {
//                         return redirectToUrl(redirect_url)
//                     }
//                     const url = 'fancall://referral-link?youtuber_id=' + user.id + '&refer_code=' + user.refer_code + '&is_youtuber=' + (user.role_id == 3)
//                     redirectToUrl(url)
//                     setTimeout(() => redirectToUrl(url), 500)
//                     redirectToUrl(url)
//                     setTimeout(() => redirectToUrl(url), 500)
//                 } else {
//                     console.log('last else block')
//                     redirectToUrl(redirect_url)
//                 }
//             })
//     </script>
// </body>

// </html>`;
// }

const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const API_URL = process.env.API_URL;
const DEFAULT_FALLBACK_LINK = process.env.DEFAULT_FALLBACK_LINK;

console.log("API_URL", API_URL);

const httpClient = axios.create({ baseURL: API_URL });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  try {
    const { link } = req.query;
    console.log("link", link);
    if (!link) throw new Error("where is link?");

    const {
      data: { data },
    } = await httpClient.get(`/get-user-info-from-referral-link?link=${link}`);

    let fullName = "";
    if (data.first_name) fullName += data.first_name;
    if (data.last_name) fullName += data.last_name;

    const og_title = fullName || "Fancall user";
    const og_url = process.env.DEFAULT_FALLBACK_LINK;
    const og_type = "website";
    const og_image =
      data?.profile_image?.[0]?.profile_image_url ||
      process.env.DEFAULT_PROFILE_IMAGE;

    const html = getHtml({ link, og_image, og_title, og_type, og_url });
    return res.set('Content-Type', 'text/html').send(html);

  } catch (error) {
    console.error("error is ", error);
    return res.set('Content-Type', 'text/html').send(getHtml({}));
  }
});

function getHtml(payload) {
  const {
    og_image = process.env.DEFAULT_PROFILE_IMAGE,
    og_type = "website",
    og_url = process.env.DEFAULT_FALLBACK_LINK,
    og_title = payload.og_title || "Fancall User",
    og_description = process.env.SOCIAL_DESCRIPTION,
    link = "",
  } = payload;

  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="${og_title}" />
    <meta name="twitter:title" content="${og_title}" />
    <meta name="twitter:description" content="${og_description}" />
    <meta property="og:description" content="${og_description}"/>
    <meta property="og:url" content="${og_url}" />
    <meta name="twitter:url" content="${og_url}" />
    <meta property="og:type" content="${og_type}" />
    <meta property="og:image" content="${og_image}" />
    <meta property="og:image:alt" content="profile_image" />
    <meta property="fb:app_id" content="${process.env.FACEBOOK_ID}" />
    <meta name="author" content="${og_title}">
    <meta name="publish_date" property="og:publish_date" content="${new Date().toISOString()}">

    <title>Fancall</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            display: grid;
            background-color: #000000;
            height: 100vh;
            place-items: center;
            overflow: hidden;
            color: white;
            width: auto;
        }

        .loader {
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            -webkit-animation: spin 2s linear infinite;
            /* Safari */
            animation: spin 2s linear infinite;
        }

        /* Safari */
        @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body>
    <div>
        <div class="loader"></div>
        <span style="margin-top: 10px; display: inline-flex">
            <b style="font-size: 2rem;">
                Redirecting you to FanCall app...
            </b>
        </span>
    </div>
    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const refer_link = urlParams.get('link');
        console.log(refer_link, 'refer_link');
        const API_URL = '${API_URL}increment-link-click?link=${link}';
        const ANDROID_PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.fancall.fancallapp'

        function redirectToUrl(url) {
            window.location = url;
        }

        const api_options = {
            method: 'POST',
            "Content-Type": "application/json",
            body: JSON.stringify({
                link: refer_link
            }),
            'no-cors': true,
            redirect: 'follow'
        }
        let redirect_url = 'https://fancall.in';
        let user;
        fetch(API_URL, api_options)
            .then(res => res.json())
            .then(({ data }) => {
                redirect_url = data.redirect_url
                user = data.user
            })
            .finally(() => {
                globalThis.location.href = redirect_url
                if(user) {
                    const is_android = /android/i.test(navigator.userAgent.toLowerCase());
                    if(!is_android) {
                        return redirectToUrl(redirect_url)
                    }
                    const url = 'fancall://referral-link?youtuber_id=' + user.id + '&refer_code=' + user.refer_code + '&is_youtuber=' + (user.role_id == 3)
                    redirectToUrl(url)
                    setTimeout(() => redirectToUrl(url), 500)
                    redirectToUrl(url)
                    setTimeout(() => redirectToUrl(url), 500)
                } else {
                    console.log('last else block')
                    redirectToUrl(redirect_url)
                }
            })
    </script>
</body>

</html>`;
}

// Export serverless handler
module.exports = app;
module.exports.handler = serverless(app);
