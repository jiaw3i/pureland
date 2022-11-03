import Vditor from "vditor";

export default function MDPreview({value = ""}) {

    Vditor.preview(
        document.getElementById("preview") as HTMLDivElement,
        value,
        {
            mode: "dark",
            anchor: 1,
        }
    )

    return (
        <div id="preview" style={{height: "100%"}}>

        </div>
    );
}