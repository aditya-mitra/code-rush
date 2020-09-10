import resizeWindow from '../resizeWindow';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/ext-language_tools"

const availableThemes = [
    "monokai", "github", "tomorrow", "kuroir", "twilight", "xcode", "textmate", "solarized_dark", "solarized_light", "terminal"
];
availableThemes.forEach(t => require(`ace-builds/src-noconflict/theme-${t}`));

const availableLangs = ["java", "javascript", "c_cpp", "kotlin", "python"];
availableLangs.forEach(l => {
    require(`ace-builds/src-noconflict/mode-${l}`);
    require(`ace-builds/src-noconflict/snippets/${l}`);
});


function Ide(props) {
    
    let { height, width } = resizeWindow();
    return (
        // change the height according to the viewport/window height
        <AceEditor
            name='ace-editor-code-rush'
            height={`${0.80 * height}px`} width={`${0.974 * width}px`}
            mode={props.mode} theme={props.theme}
            focus={true} fontSize={20}
            onChange={props.handleCode}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true
            }}
        />
    );
}

export default Ide;
