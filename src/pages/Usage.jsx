import { Link } from "@solidjs/router";

const Usage = () => {
    return (
        <div class="container mt-3">
            <h1>Usage</h1>
            <p>
                To use YouTube Downloader, simply enter the URL of the YouTube
                video you want to download in the input field on the home page
                and click the "Download" button. You will then be taken to a
                page where you can choose the format and quality of the video
                you want to download. Once you've made your selection, click the
                "Download" button again to start the download process.
            </p>
            <p>
                This app is powered by several open-source packages, including:
            </p>
            <ul>
                <li>SolidJS</li>
                <li>SolidJS Router</li>
                <li>Axios</li>
                <li>YouTube-dl</li>
                <li>Express</li>
                <li>Bootstrap</li>
            </ul>
            <p>
                If you'd like to learn more about how this app was built, you
                can check out the code on my GitHub page:{" "}
                <a href="https://github.com/your-username">janithsamee</a>.
            </p>
            <p>
                Thank you for using YouTube Downloader! If you have any
                questions or feedback, please don't hesitate to{" "}
                <Link href="/janithsamee.me">contact me</Link>.
            </p>
        </div>
    );
};

export default Usage;
