# edx-scrape
Scrape the html from edX

## What is this

[edx-dl](https://github.com/coursera-dl/edx-dl/issues) is a wonderful tool made to pull down all the videos/pdfs from an edX course. Unforunately, it is not currently setup to download any HTML content see [#600](https://github.com/coursera-dl/edx-dl/issues/600). 

Until **edx-dl** is able to download HTML itself I've made a little hacky script to download it for you.

If you want to download PDFs of all the Q/A checkout out [edx-archive](https://github.com/EugeneLoy/edx-archive).

## Usage

1. Copy the code from `index.js`
1. Open your browser and go to the "Progress" page of the course. 
    * Example: https://courses.edx.org/courses/course-v1:MITx+6.431x+3T2018/progress
1. Open the console in devtools | [instructions](https://support.monday.com/hc/en-us/articles/360002197259-How-to-Open-the-Developer-Console-in-ycur-Browser)
1. Paste the code from `index.js` and press enter.
1. The script will automatically download the html of all pages listed under progress and output a zip.
1. Unzip the file and then open the "pages" folder in your browser


## Limits

Currently this script only download the raw HTML it does not grab:   
* Images
* Results of the "Show Answers" button

The downloaded pages rely on a few js scripts to be cached in browser if you would like to view the pages offline. 

Navigating between pages won't work.

## Contributing

I'd much rather you contribute to the `edx-dl` project. See [#600](https://github.com/coursera-dl/edx-dl/issues/600). But if you'd like to improve this open a ticket and we can chat
