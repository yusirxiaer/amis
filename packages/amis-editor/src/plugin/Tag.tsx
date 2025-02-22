import {
  registerEditorPlugin,
  RendererPluginAction,
  RendererPluginEvent
} from 'amis-editor-core';
import {BaseEventContext, BasePlugin} from 'amis-editor-core';
import {undefinedPipeOut, getSchemaTpl} from 'amis-editor-core';
import {getEventControlConfig} from '../renderer/event-control/helper';

const presetColors = [
  '#2468f2',
  '#b8babf',
  '#528eff',
  '#30bf13',
  '#f33e3e',
  '#ff9326',
  '#fff',
  '#000'
];

export class TagPlugin extends BasePlugin {
  // 关联渲染器名字
  rendererName = 'tag';
  $schema = '/schemas/TagSchema.json';

  // 组件名称
  name = '标签';
  isBaseComponent = true;
  icon = 'fa fa-tag';
  pluginIcon = 'tag-plugin';
  description = '用于标记和选择的标签';
  docLink = '/amis/zh-CN/components/tag';
  tags = ['展示'];
  previewSchema = {
    type: 'tag',
    label: '普通标签',
    color: 'processing'
  };
  scaffold: any = {
    type: 'tag',
    label: '普通标签',
    color: 'processing'
  };

  panelTitle = '标签';
  panelJustify = true;

  // 事件定义
  events: RendererPluginEvent[] = [
    {
      eventName: 'click',
      eventLabel: '点击',
      description: '点击时触发',
      dataSchema: [
        {
          type: 'object',
          properties: {
            nativeEvent: {
              type: 'object',
              title: '鼠标事件对象'
            }
          }
        }
      ]
    },
    {
      eventName: 'mouseenter',
      eventLabel: '鼠标移入',
      description: '鼠标移入时触发',
      dataSchema: [
        {
          type: 'object',
          properties: {
            nativeEvent: {
              type: 'object',
              title: '鼠标事件对象'
            }
          }
        }
      ]
    },
    {
      eventName: 'mouseleave',
      eventLabel: '鼠标移出',
      description: '鼠标移出时触发',
      dataSchema: [
        {
          type: 'object',
          properties: {
            nativeEvent: {
              type: 'object',
              title: '鼠标事件对象'
            }
          }
        }
      ]
    }
  ];

  // 动作定义
  actions: RendererPluginAction[] = [];

  panelBodyCreator = (context: BaseEventContext) => {
    return getSchemaTpl('tabs', [
      {
        title: '属性',
        body: getSchemaTpl('collapseGroup', [
          {
            title: '基本',
            body: [
              getSchemaTpl('label'),
              {
                type: 'button-group-select',
                label: '模式',
                name: 'displayMode',
                value: 'normal',
                size: 'md',
                options: [
                  {
                    label: '普通',
                    value: 'normal'
                  },
                  {
                    label: '圆角',
                    value: 'rounded'
                  },
                  {
                    label: '状态',
                    value: 'status'
                  }
                ]
              },
              getSchemaTpl('icon', {
                visibleOn: 'data.displayMode === "status"',
                label: '前置图标'
              })
            ]
          },
          getSchemaTpl('status')
        ])
      },
      {
        title: '外观',
        body: getSchemaTpl('collapseGroup', [
          {
            title: '颜色',
            body: [
              {
                type: 'input-color',
                label: '主题',
                name: 'color',
                presetColors,
                pipeOut: undefinedPipeOut
              },
              {
                type: 'input-color',
                label: '背景色',
                name: 'style.backgroundColor',
                presetColors,
                pipeOut: undefinedPipeOut
              },
              {
                type: 'input-color',
                label: '边框',
                name: 'style.borderColor',
                presetColors,
                pipeOut: undefinedPipeOut
              },
              {
                type: 'input-color',
                label: '文字',
                name: 'style.color',
                presetColors,
                pipeOut: undefinedPipeOut
              }
            ]
          },
          getSchemaTpl('style:classNames', {
            isFormItem: false
          })
        ])
      },
      {
        title: '事件',
        className: 'p-none',
        body: [
          getSchemaTpl('eventControl', {
            name: 'onEvent',
            ...getEventControlConfig(this.manager, context)
          })
        ]
      }
    ]);
  };
}

registerEditorPlugin(TagPlugin);
