import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.scss";
import { Show, createSignal, onMount } from "solid-js";
import { formatFileSize } from "../util/formater";
import { getVideoData } from "../util/api";
import Navbar from "../components/Navbar";

export default function Home() {
    const [url, setUrl] = createSignal("");
    const [videoData, setvideoData] = createSignal("");
    const [loading, setloading] = createSignal(false);
    const [error, seterror] = createSignal("");
    const [formats, setFormats] = createSignal([]);

    async function handleDownload(event) {
        try {
            event.preventDefault();
            setloading(true);
            const response = await getVideoData(url);
            const data = response.data;
            setloading(false);
            const { formats, ...rest } = data;
            setFormats(formats);
            setvideoData(rest);
            setUrl("");
        } catch (error) {
            seterror(error.message || "Something went wrong!");
            setloading(false);
        }
    }
    onMount(() => {
        setUrl("");
    });

    return (
        <>
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                <Show when={error() !== ""}>
                                    <div
                                        class="alert alert-danger"
                                        role="alert"
                                    >
                                        {error}
                                    </div>
                                </Show>
                                <h5 class="card-title">YouTube Downloader</h5>
                                <p class="font-muted">
                                    Add your youtube url here. to download the
                                    video/audio files.
                                </p>
                                <form onsubmit={handleDownload}>
                                    <div class="form-group">
                                        <label for="url">Video URL:</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="url"
                                            value={url()}
                                            oninput={(e) =>
                                                setUrl(e.target.value)
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        class="btn btn-primary mt-2"
                                        disabled={loading()}
                                    >
                                        {loading() ? (
                                            <>
                                                <span
                                                    class="spinner-border spinner-border-sm mr-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                <span> Loading...</span>
                                            </>
                                        ) : (
                                            "Download"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                        <Show when={videoData() !== ""}>
                            <div class="card my-3">
                                <div class="row no-gutters">
                                    <div class="col-md-4">
                                        <img
                                            src={videoData().thumbnail}
                                            class="card-img m-2 custom-image"
                                            alt={videoData().title}
                                        />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                {videoData().title}
                                            </h5>
                                            <p
                                                class="card-text mb-1"
                                                style={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {videoData().description &&
                                                    videoData().description.slice(
                                                        0,
                                                        100
                                                    )}
                                            </p>
                                            <p class="card-text font-weight-bold mb-0 text-muted font-italic">
                                                {videoData().channel}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Show>
                        {formats() && formats().length > 0 && (
                            <div class="card mt-3">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Available Formats
                                    </h5>
                                    <ul class="list-group">
                                        <For each={formats()}>
                                            {(format) => (
                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <div class="ms-2 me-auto">
                                                        <div class="fw-bold">
                                                            {format.format}
                                                        </div>

                                                        <a
                                                            class="btn btn-dark"
                                                            href={format.url}
                                                            download="file.mp4"
                                                        >
                                                            Download{" ("}
                                                            {formatFileSize(
                                                                format.filesize
                                                            )}
                                                            {")"}
                                                        </a>
                                                    </div>
                                                    <span class="badge bg-primary rounded-pill">
                                                        {format.ext}
                                                    </span>
                                                </li>
                                            )}
                                        </For>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
