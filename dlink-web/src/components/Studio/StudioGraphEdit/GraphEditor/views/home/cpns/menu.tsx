import { Menu } from '@antv/x6-react-components';
import { FC, memo, useState } from 'react';
import { message, Radio, RadioChangeEvent, Space } from 'antd';
import { DataUri, Graph, Node } from '@antv/x6';
import '@antv/x6-react-components/es/menu/style/index.css';
import {
  CopyOutlined,
  SnippetsOutlined,
  RedoOutlined,
  UndoOutlined,
  ScissorOutlined,
  DeleteOutlined,
  ExportOutlined,
  EditOutlined,
  RadiusSettingOutlined,
  GroupOutlined,
  AlignCenterOutlined,
  BgColorsOutlined
} from '@ant-design/icons';
import CustomShape from "@/components/Studio/StudioGraphEdit/GraphEditor/utils/cons";
import { useAppSelector } from '@/components/Studio/StudioGraphEdit/GraphEditor/hooks/redux-hooks';
import { formatDate } from "@/components/Studio/StudioGraphEdit/GraphEditor/utils/math"

type MenuPropsType = {
  top: number;
  left: number;
  graph: Graph;
  node: Node | null,
  show: boolean,
  handleShowMenu: (value: boolean) => void
};

enum HorizontalAlignState {
  LEFT = 1,
  CENTER,
  RIGHT
}

enum VerticalAlignState {
  TOP = 1,
  CENTER,
  BOTTOM
}

enum NoteTextColor {
  YELLOW = 1,
  ORANGE,
  RED,
  PURPLE,
  GREEN,
  BLUE,
  GRAY,
  TRANSPARENT,
}

const NoteTextColorValue: { [key in NoteTextColor]: string } = {
  [NoteTextColor.YELLOW]: "#fcf987",
  [NoteTextColor.RED]: "#ffe9dc",
  [NoteTextColor.ORANGE]: "#fffad2",
  [NoteTextColor.PURPLE]: "#f6deed",
  [NoteTextColor.GREEN]: "#ddeed2",
  [NoteTextColor.BLUE]: "#e3dff1",
  [NoteTextColor.GRAY]: "#d1d1d1",
  [NoteTextColor.TRANSPARENT]: "transparent",
}

const DuplicateOperatorMenu = () => {
  return <Menu.Item icon={<EditOutlined />} name="add-port" text="添加输出桩" />
}

export const CustomMenu: FC<MenuPropsType> = memo(({ top = 0, left = 0, graph, node, handleShowMenu, show }) => {

  const { taskName } = useAppSelector((state) => ({
    taskName: state.home.taskName,
  }));
  const convertHorizontalAlign = (align: string) => {
    switch (align) {
      case 'left':
        return HorizontalAlignState.LEFT
      case 'center':
        return HorizontalAlignState.CENTER
      case 'right':
        return HorizontalAlignState.RIGHT
      default:
        return HorizontalAlignState.LEFT
    }
  }

  const convertVerticalAlign = (align: string) => {
    switch (align) {
      case 'top':
        return VerticalAlignState.TOP
      case 'center':
        return VerticalAlignState.CENTER
      case 'bottom':
        return VerticalAlignState.BOTTOM
      default:
        return VerticalAlignState.TOP
    }
  }

  const { Item: MenuItem, SubMenu, Divider } = Menu;
  const [messageApi, contextHolder] = message.useMessage();
  const [isDisablePaste, setIsDisablePaste] = useState(true);
  const [horizontalAlign, setHorizontalAlign] =
    useState(convertHorizontalAlign(node?.getData()?.horizontalAlign ?? 'left'));
  const [verticalAlign, setVerticalAlign] =
    useState(convertVerticalAlign(node?.getData()?.verticalAlign ?? 'top'));
  const [noteTextColor, setNoteTextColor] = useState(node?.getData()?.backgroundColor) ?? 'yellow';
  const copy = () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
  };

  const cut = () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
  };

  const paste = () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
  };

  const front = () => {

    const cells = graph.getSelectedCells();
    cells?.forEach(c => c.toFront())
  };

  const back = () => {
    const cells = graph.getSelectedCells();
    cells?.forEach(c => c.toBack())
  };

  const forward = () => {
    const cells = graph.getSelectedCells();
    cells?.forEach(c => { c.setZIndex((c.getZIndex() ?? 0) + 1) });
  };

  const backward = () => {
    const cells = graph.getSelectedCells();
    cells?.forEach(c => { c.setZIndex((c.getZIndex() ?? 0) - 1) });
  };

  const horizontalAlignHandler = (e: RadioChangeEvent) => {
    const horizontalAlign = e.target.value as number;
    const align = ((value: number) => {
      switch (value) {
        case HorizontalAlignState.LEFT:
          return 'left'
        case HorizontalAlignState.CENTER:
          return 'center'
        case HorizontalAlignState.RIGHT:
          return 'right'
        default:
          return 'left'
      }
    })(horizontalAlign);
    graph.getSelectedCells()?.filter(c => c.shape == CustomShape.TEXT_NODE)
      .forEach(c => c.setData({ ...c.getData(), 'horizontalAlign': align }))
    setHorizontalAlign(horizontalAlign)
  }

  const verticalAlignHandler = (e: RadioChangeEvent) => {
    const verticalAlign = e.target.value as number;
    const align = ((value: number) => {
      switch (value) {
        case VerticalAlignState.TOP:
          return 'top'
        case VerticalAlignState.CENTER:
          return 'center'
        case VerticalAlignState.BOTTOM:
          return 'bottom'
        default:
          return 'top'
      }
    })(verticalAlign);
    const cc = graph.getSelectedCells()?.filter(c => c.shape == CustomShape.TEXT_NODE)
    cc.forEach(c => c.setData({ ...c.getData(), 'verticalAlign': align }))
    setVerticalAlign(verticalAlign)
  }

  const noteTextColorHandler = (e: RadioChangeEvent) => {
    const noteTextColor = e.target.value as number;
    const color = noteTextColor ? NoteTextColorValue[noteTextColor] : NoteTextColorValue[NoteTextColor.TRANSPARENT]
    const cc = graph.getSelectedCells()?.filter(c => c.shape == CustomShape.TEXT_NODE)
    cc.forEach(c => c.setData({ ...c.getData(), 'backgroundColor': color }))
    setNoteTextColor(noteTextColor)
  }


  const onMenuClick = (name: string) => {
    messageApi.info(`clicked ${name}`);
    handleShowMenu(false)

    switch (name) {
      case 'undo':
        graph.undo();
        break;
      case 'redo':
        graph.redo();
        break;
      case 'delete':
        graph.clearCells();
        break;
      case 'save-PNG':
        graph.toPNG(
          (dataUri: string) => {
            DataUri.downloadDataUri(dataUri, 'chartx.png');
          },
          {
            backgroundColor: 'white',
            padding: {
              top: 20,
              right: 30,
              bottom: 40,
              left: 50,
            },
            quality: 1,
          },
        );
        break;
      case 'save-SVG':
        graph.toSVG((dataUri: string) => {
          // 下载
          DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg');
        });
        break;
      case 'save-JPEG':
        graph.toJPEG((dataUri: string) => {
          // 下载
          DataUri.downloadDataUri(dataUri, 'chart.jpeg');
        });
        break;
      case 'print':
        // graph.printPreview();
        break;
      case 'copy':
        copy();
        setIsDisablePaste(false);
        break;
      case 'cut':
        cut();
        setIsDisablePaste(false);
        break;
      case 'paste':
        paste();
        setIsDisablePaste(true);
        break;
      case 'save-JSON':
        let data = JSON.stringify(graph.toJSON(), null, 4);
        const blob = new Blob([data], { type: 'text/json' }),
          e = new MouseEvent('click'),
          a = document.createElement('a');
        a.download = `${taskName}_${formatDate(Date.now())}`;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        a.dispatchEvent(e);

        // graph.fromJSON({cells:[graph.toJSON().cells[0],graph.toJSON().cells[1]]})
        break;
      case 'add-port':
        break;
      case 'front':
        front();
        break;
      case 'back':
        back();
        break;
      case 'forward':
        forward();
        break;
      case 'backward':
        backward();
        break;
      case "createProcess":
        createProcess();
      default:
        break;
    }
  };
  const createProcess = () => {

    const node = graph.createNode({
      name: "param.name",
      shape: CustomShape.GROUP_PROCESS,
      width: 70,
      height: 50,
      attrs: {
        body: {
          rx: 7,
          ry: 6,
        },
        text: {
          text: " param.name",
          fontSize: 2,
        },
      },
    });
    const group = graph.addNode(node);
    const cells = graph.getSelectedCells();
    cells?.forEach(c => { c.hide(); group.addChild(c); graph.resetSelection(group) })

  }
  const onMenuItemClick = () => { };
  const blankMenu = () => {

    return (<Menu hasIcon={true} onClick={onMenuClick}>
      {(node?.shape === "DuplicateOperator") && DuplicateOperatorMenu()}

      {node?.shape == CustomShape.TEXT_NODE && <>
        <SubMenu name="align" icon={<AlignCenterOutlined />} text="Text alignment">
          <Radio.Group name="horizontal" onChange={horizontalAlignHandler} value={horizontalAlign}>
            <Space.Compact direction="vertical">
              <Radio value={HorizontalAlignState.LEFT}>Left</Radio>
              <Radio value={HorizontalAlignState.CENTER}>H-Center</Radio>
              <Radio value={HorizontalAlignState.RIGHT}>Right</Radio>
            </Space.Compact>
          </Radio.Group>
          <Divider />
          <Radio.Group name="vertical" onChange={verticalAlignHandler} value={verticalAlign}>
            <Space.Compact direction="vertical">
              <Radio value={VerticalAlignState.TOP}>Top</Radio>
              <Radio value={VerticalAlignState.CENTER}>V-Center</Radio>
              <Radio value={VerticalAlignState.BOTTOM}>Bottom</Radio>
            </Space.Compact>
          </Radio.Group>
        </SubMenu>
        <SubMenu name="color" icon={<BgColorsOutlined />} text="Note Color">
          <Radio.Group name="color" size="small" onChange={noteTextColorHandler} value={noteTextColor}>
            <Space.Compact direction="horizontal">
              {Object.keys(NoteTextColor).filter(key => !isNaN(Number(NoteTextColor[key]))).map(
                (key) =>
                (
                  <>
                    <style>{`.ant-radio > input#radio-text-${key} + span.ant-radio-inner {background-color: ${NoteTextColorValue[NoteTextColor[key]]}}`}</style>
                    <Radio id={`radio-text-${key}`} value={NoteTextColor[key]} />
                  </>
                )
              )}
            </Space.Compact>
          </Radio.Group>
        </SubMenu>
        <Divider />
      </>
      }
      {node && <>
        <MenuItem
          onClick={onMenuItemClick}
          name="createProcess"
          icon={<GroupOutlined />}
          text="Move into new subprocess"
        />
      </>}
      <MenuItem
        onClick={onMenuItemClick}
        name="undo"
        icon={<UndoOutlined />}
        hotkey="Cmd+Z"
        text="Undo"
      />
      <MenuItem name="redo" icon={<RedoOutlined />} hotkey="Cmd+Shift+Z" text="Redo" />

      {!node && <SubMenu text="Export" icon={<ExportOutlined />}>
        <MenuItem name="save-PNG" text="Save As PNG" />
        <MenuItem name="save-SVG" text="Save As SVG" />
        <MenuItem name="save-JPEG" text="Save As JPEG" />
        <MenuItem name="save-JSON" text="Save As JSON" />
      </SubMenu>}

      <Divider />

      <MenuItem icon={<ScissorOutlined />} name="cut" hotkey="Cmd+X" text="Cut" />
      <MenuItem icon={<CopyOutlined />} name="copy" hotkey="Cmd+C" text="Copy" />

      <MenuItem
        name="paste"
        icon={<SnippetsOutlined />}
        hotkey="Cmd+V"
        disabled={isDisablePaste}
        text="Paste"
      />
      <MenuItem name="delete" icon={<DeleteOutlined />} hotkey="Delete" text="Delete" />

      <Divider />

      <SubMenu name="order" icon={<RadiusSettingOutlined />} text="Change Order">
        <MenuItem name="front" icon={<RadiusSettingOutlined />} hotkey="Cmd+Shift+F" text="Bring to Front" />
        <MenuItem name="back" icon={<RadiusSettingOutlined />} hotkey="Cmd+Shift+B" text="Bring to Back" />
        <Divider />
        <MenuItem name="forward" icon={<RadiusSettingOutlined />} hotkey="Cmd+F" text="Bring Forward" />
        <MenuItem name="backward" icon={<RadiusSettingOutlined />} hotkey="Cmd+B" text="Bring Backward" />
      </SubMenu>
    </Menu>)
  }

  const styleObj: any = {
    position: 'absolute',
    top: `${top}px`, // 将top属性设置为state变量的值
    left: `${left}px`,
    width: '100px',
    height: '105px',
    zIndex: 9999,
  };

  return (
    <div style={styleObj}>
      {contextHolder}
      {blankMenu()}

    </div>
  );
});
