import 'spectre.css/dist/spectre.css';
import 'spectre.css/dist/spectre-exp.css';
import 'spectre.css/dist/spectre-icons.css';
import styles from './index.less';
import { textSchema } from "../../../assets/json-data/text-node-schema"

import { memo, useEffect, useRef } from 'react';
import { Node } from '@antv/x6';
import { useAppDispatch, useAppSelector, } from '@/components/Studio/StudioGraphEdit/GraphEditor/hooks/redux-hooks';
import { JSONEditor, JSONEditorOptions } from '@json-editor/json-editor';
import {
  changeCurrentSelectNode,
  changeCurrentSelectNodeParamsData,
  changeJsonEditor,
} from '@/components/Studio/StudioGraphEdit/GraphEditor/store/modules/home';
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { createRoot } from "react-dom/client";
import { MyMonacoEditor as myMonaco } from "@/components/Studio/StudioGraphEdit/GraphEditor/utils/my-monaco-editor";
import { MyAutoCompleteEditor as myautoinput } from "@/components/Studio/StudioGraphEdit/GraphEditor/utils/my-auto-complete-editor";
import CustomShape from '../../../utils/cons';

const EditorTip = (title: string) => {
  return (<Tooltip title={title}>
    <QuestionCircleOutlined />
  </Tooltip>)
};

function preProcessJsonEditor() {
  // register monaco
  JSONEditor.defaults.editors['monaco'] = myMonaco;
  const aceModes = ['actionscript', 'batchfile', 'c', 'c++', 'cpp', 'coffee', 'csharp', 'css', 'dart', 'django', 'ejs', 'erlang', 'golang', 'groovy', 'handlebars', 'haskell', 'haxe', 'html', 'ini', 'jade', 'java', 'javascript', 'json', 'less', 'lisp', 'lua', 'makefile', 'matlab', 'mysql', 'objectivec', 'pascal', 'perl', 'pgsql', 'php', 'python', 'r', 'ruby', 'sass', 'scala', 'scss', 'sh', 'smarty', 'sql', 'sqlserver', 'stylus', 'svg', 'twig', 'vbscript', 'xml', 'yaml']
  const monaco: any = (schema: any) => schema.type === 'string' && aceModes.includes(schema.format) && 'monaco'
  JSONEditor.defaults.resolvers = [monaco, ...JSONEditor.defaults.resolvers]

  // register autocomplete.js
  JSONEditor.defaults.editors['autoinput'] = myautoinput;
  const autoinput: any = (schema: any) => schema.type === 'string' && schema.format === 'autoinput' && 'autoinput'
  JSONEditor.defaults.resolvers = [autoinput, ...JSONEditor.defaults.resolvers]
}

const Editor = memo(() => {

  const jsonRef = useRef<HTMLDivElement>(null);
  let editor: InstanceType<typeof JSONEditor>
  const dispatch = useAppDispatch();
  const { operatorParameters, currentSelectNode, edgeClickInfo } = useAppSelector(
    (state) => ({
      operatorParameters: state.home.operatorParameters,
      currentSelectNode: state.home.currentSelectNode,
      edgeClickInfo: state.home.edgeClickInfo
    }),
  );

  let isTextNode: boolean = currentSelectNode.shape === "custom-text-node";
  const textNodeSchema = isTextNode ? textSchema : null
  const currentNodeDes = operatorParameters.find((item: any) => item.code === currentSelectNode.shape);
  const config: JSONEditorOptions<any> = {
    schema: isTextNode ? textNodeSchema : (currentNodeDes?.specification ?? null),
    //设置主题,可以是bootstrap或者jqueryUI等
    theme: 'spectre',
    //设置字体
    iconlib: 'spectre',
    //如果设置为 true, 将隐藏编辑属性按钮.
    disable_properties: true,
    disable_edit_json: true,
    //如果设置为 true, 数组对象将不显示“向上”、“向下”移动按钮.
    disable_array_reorder: true,
    //属性为object时,属性默认normal,设置grid可以一排多个
    object_layout: 'normal',
    disable_array_delete: false,
    compact: true,
  };

  useEffect(() => {
    if (!jsonRef.current || !config.schema) {
      return
    }

    const container = jsonRef.current;
    container.innerHTML = '';
    preProcessJsonEditor();

    editor = new JSONEditor<any>(container, config);

    editor.on('ready', function () {
      dispatch(changeJsonEditor(editor))

      if (!(currentSelectNode instanceof Node)) {
        return;
      }

      if (currentSelectNode.getData()?.parameters) {
        //解决bug 防止直接将config的值设置
        editor.setValue(currentSelectNode.getData().parameters)
      } 
       if (currentSelectNode.shape === CustomShape.TEXT_NODE) {
        editor.setValue(currentSelectNode.getData())
      }
    });



    editor.on('change', function () {
      
      //先恢复初始值
      dispatch(changeCurrentSelectNodeParamsData([]));
      dispatch(changeCurrentSelectNodeParamsData(editor.getValue()));

      if (!(currentSelectNode instanceof Node)) {
        return
      }

      if (currentSelectNode.shape === "custom-text-node") {
        currentSelectNode.setData(editor.getValue())
        dispatch(changeCurrentSelectNode(currentSelectNode));
        return
      }

      changeStyle()

      //判断当前节点是否有变化
      // 如果是同一个节点，说明只是值发生变化
      //如果节点发生变化，则不设置，让其读取自己的配置
      currentSelectNode.setData(
        {
          parameters: editor.getValue(),
          config: currentSelectNode.getData()?.config ?? []
        },
        { overwrite: true });
      dispatch(changeCurrentSelectNode(currentSelectNode));
    });

    function changeStyle() {
      //modify description
      const labels = document.querySelectorAll('.je-panel label')
      labels.forEach((item: Element) => {
        const desc: HTMLElement | null | undefined = item.parentElement?.querySelector('p.je-desc')
        if (!desc) {
          return
        }

        const dev = document.createElement('div')
        const root = createRoot(dev);
        root.render(<>{EditorTip(desc.textContent ?? '')}</>)
        if (item.querySelector('div') === null) {
          item.append(dev)
        }
        desc.remove()
      })

      //modify question mark
      const h4Label = document.querySelectorAll('.je-panel h4')
      h4Label.forEach((item: Element) => {
        const desc: HTMLElement | null | undefined = item.parentElement?.querySelector('h4 + span + div + p, h4 + div + p')
        if (!desc) {
          return
        }

        const dev = document.createElement('div')
        const root = createRoot(dev);
        root.render(<>{EditorTip(desc.textContent ?? '')}</>)
        if (item.querySelector('div') === null) {
          item.append(dev)
        }
        desc.remove()
      })

      //modify delete columns button
      const dataObjects = document.querySelectorAll('.je-object__container')
      dataObjects.forEach(item => {
        const deleteButton: HTMLElement | null = item.querySelector(':scope > .btn-group > button[title^="Delete"]')
        if (!deleteButton) {
          return
        }

        const icon = deleteButton.querySelector('.icon-delete + span')
        if (!icon) {
          return
        }
        icon.innerHTML = ""

        const h4 = item.querySelector('h4.je-object__title');
        h4?.append(deleteButton.parentElement!);
      })

      //modify delete items button
      const deleteItems = document.querySelectorAll('.je-panel > div > .je-panel')
      deleteItems.forEach(item => {
        const deleteButton = item.querySelector('.btn-group > button[title^="Delete"]')
        if (!deleteButton) {
          return
        }

        const itemFormGroup = item.querySelector('.form-group')
        itemFormGroup?.append(deleteButton.parentElement!)
        itemFormGroup?.setAttribute('style', 'flex-wrap: nowrap')
      })


    }

    return () => {
      editor.destroy()
    }

  }, [operatorParameters, currentSelectNode, edgeClickInfo]);

  return <div className={styles['json-editor-content']} ref={jsonRef}></div>;
});



export default Editor;
