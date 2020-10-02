import resizeWindow from '../resizeWindow';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/ext-language_tools"

const availableThemes = [
    "monokai", "github", "tomorrow", "kuroir", "twilight", "xcode", "textmate", "solarized_dark", "solarized_light", "terminal"
];
availableThemes.forEach(t => require(`ace-builds/src-noconflict/theme-${t}`));

const availableLangs = ["java", "javascript", "c_cpp", "ruby", "python"];
availableLangs.forEach(l => {
    require(`ace-builds/src-noconflict/mode-${l}`);
    require(`ace-builds/src-noconflict/snippets/${l}`);
});


function Ide(props) {

    let { height, width } = resizeWindow();

    // ace has single mode for c and cpp called c_cpp
    let aceMode;
    if(props.mode === 'c' || props.mode === 'cpp')
        aceMode='c_cpp';
    else
        aceMode=props.mode;
    return (
        // change the height according to the viewport/window height
        <AceEditor
            name='ace-editor-code-rush'
            height={`${0.80 * height}px`} width={`${0.820 * width}px`}
            mode={aceMode} theme={props.theme}
            focus={true} fontSize={20}
            onChange={props.handleCode}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true
            }}
            style={{marginLeft:'6.5rem'}}
        />
    );
}

export default Ide;
