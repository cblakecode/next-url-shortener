/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    DATABASE_URL:
      "mysql://ggn1nlvbhyw89bkkffie:pscale_pw_g4lCYMdvcdC56yBgBZojYS3Sc0Cn7yyLjAyZvGcl3vl@us-east.connect.psdb.cloud/url-shortener?sslaccept=strict",
    BASE_URL: "http://localhost:300",
    SHADOW_DATABASE_URL: "mysql://root:v@ozPCJZ@0?k@localhost:3306",
  },
};
