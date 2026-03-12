import React, { useMemo, useState } from 'react';
import { Avatar, Layout, Tag, Typography } from 'antd';
import { BellOutlined, FieldTimeOutlined } from '@ant-design/icons';
import './AudioTagEditorPage.css';

const { Text } = Typography;

type AudioScriptItem = {
  volume: number;
  speechRate: number;
  pitchRate: number;
  content: string;
  scence: string;
  voice: string;
  checked: boolean;
  sourceType: number;
  uid: string;
  bgmVolume: number;
  changed?: number;
};

type Segment =
  | { type: 'text'; value: string }
  | { type: 'prompt'; value: string }
  | { type: 'pause'; value: string };

const voiceMeta: Record<string, { name: string; avatar: string }> = {
  Aijia: {
    name: '艾佳',
    avatar:
      'https://yuntisyscdn.bookln.cn/server/aiaudio/photo/%E8%89%BE%E4%BD%B3%403x.png',
  },
  Halen: {
    name: 'Halen',
    avatar:
      'https://yuntisyscdn.bookln.cn/server/aiaudio/photo/%E6%B5%B7%E4%BC%A6%403x.png',
  },
  William: {
    name: 'William',
    avatar:
      'https://yuntisyscdn.bookln.cn/server/aiaudio/photo/%E5%A8%81%E5%BB%89%403x.png',
  },
};

const initialData: AudioScriptItem[] = [
  {
    volume: 100,
    speechRate: -250,
    pitchRate: -50,
    content: '[提示音-轻快]2016年安徽省普通高中学业水平考试[停顿-1.0s]',
    scence: 'commonScence',
    voice: 'Aijia',
    checked: false,
    sourceType: 1,
    uid: '726400ca-9e10-47ff-b31d-4a86b98b71e5',
    bgmVolume: -8,
    changed: 1,
  },
  {
    uid: '54907ca6-43a6-48de-9387-1816438172bb',
    content: '[提示音-轻快]2016年安徽省普通高中学业水平考试[停顿-1.0s]',
    checked: false,
    volume: 100,
    speechRate: -250,
    pitchRate: -50,
    scence: 'commonScence',
    voice: 'Aijia',
    sourceType: 1,
    bgmVolume: -8,
    changed: 1,
  },
  {
    volume: 100,
    speechRate: -250,
    pitchRate: -50,
    content: '英语试题听力部分[停顿-1.0s]',
    scence: 'commonScence',
    voice: 'Aijia',
    checked: false,
    sourceType: 1,
    uid: 'c133931d-cb92-4cd0-b773-d569e19a7bc3',
    bgmVolume: -8,
    changed: 1,
  },
  {
    volume: 100,
    speechRate: -250,
    pitchRate: -50,
    content: '．关键词语选择[停顿-0.5s]',
    scence: 'commonScence',
    voice: 'Aijia',
    checked: false,
    sourceType: 1,
    uid: '6f3b45f2-0e5c-4e80-b810-0bdf25ecf3b9',
    bgmVolume: -8,
    changed: 1,
  },
  {
    volume: 100,
    speechRate: -250,
    pitchRate: -50,
    content:
      '听下面五个句子。从每小题所给的A、B、C三个选项中选出你听到的单词或短语。每个句子读两遍。[停顿-1.0s]',
    scence: 'commonScence',
    voice: 'Aijia',
    checked: false,
    sourceType: 1,
    uid: '6e9db154-c961-459d-b3f6-22cdcf719558',
    bgmVolume: -8,
    changed: 1,
  },
  {
    volume: 100,
    speechRate: -350,
    pitchRate: -50,
    content:
      "6.  I know you are very fond of music. I'll play a piece for you. Classical music or jazz?[停顿-0.5s]",
    scence: 'englishScence',
    voice: 'William',
    checked: false,
    sourceType: 1,
    bgmVolume: -8,
    uid: '400fc309-58be-472f-95c5-d1b72bac8304',
  },
  {
    volume: 100,
    speechRate: -350,
    pitchRate: -50,
    content: 'I like neither. Do you have pop music?[停顿-1.0s]',
    scence: 'englishScence',
    voice: 'Halen',
    checked: false,
    sourceType: 1,
    bgmVolume: -8,
    uid: '4656b284-b731-4e1a-a38c-9770dba5fab7',
  },
];

const parseContentSegments = (content: string): Segment[] => {
  const regex = /\[(提示音|停顿)-([^\]]+)\]/g;
  const segments: Segment[] = [];
  let currentIndex = 0;

  for (const match of content.matchAll(regex)) {
    const full = match[0];
    const markerType = match[1];
    const markerValue = match[2];
    const matchIndex = match.index ?? 0;

    if (matchIndex > currentIndex) {
      segments.push({ type: 'text', value: content.slice(currentIndex, matchIndex) });
    }

    segments.push({ type: markerType === '提示音' ? 'prompt' : 'pause', value: markerValue });
    currentIndex = matchIndex + full.length;
  }

  if (currentIndex < content.length) {
    segments.push({ type: 'text', value: content.slice(currentIndex) });
  }

  return segments;
};

const AudioTagEditorPage: React.FC = () => {
  const [rows, setRows] = useState<AudioScriptItem[]>(initialData);

  const jsonPreview = useMemo(() => JSON.stringify(rows, null, 2), [rows]);

  const patchRow = (uid: string, patch: Partial<AudioScriptItem>) => {
    setRows((prev) =>
      prev.map((item) => (item.uid === uid ? { ...item, ...patch, changed: 1 } : item)),
    );
  };

  const updateNumberField = (uid: string, key: 'volume' | 'speechRate' | 'pitchRate', value: string) => {
    const normalized = Number(value.replace(/[^\d-]/g, ''));
    patchRow(uid, { [key]: Number.isNaN(normalized) ? 0 : normalized } as Partial<AudioScriptItem>);
  };

  return (
    <Layout.Content className="audio-tag-editor-page">
      <div className="editor-header">
        <Text strong>脚本数据实时渲染（纯页面元素编辑，无输入框）</Text>
        <Text type="secondary">共 {rows.length} 条</Text>
      </div>

      <div className="ai_audio_list" spellCheck={false}>
        {rows.map((row, index) => {
          const meta = voiceMeta[row.voice] ?? {
            name: row.voice,
            avatar: 'https://yuntisyscdn.bookln.cn/server/aiaudio/photo/%E8%89%BE%E4%BD%B3%403x.png',
          };

          return (
            <div className="ai_audio_item" key={row.uid}>
              <div className="ai_audio_top">
                <div className="ai_audio_left">
                  <span>{String(index + 1).padStart(2, '0')}.</span>
                  <Avatar size={26} src={meta.avatar} />
                  <span>{meta.name}</span>
                  <Tag>{row.scence}</Tag>
                </div>

                <span
                  className={`check-chip ${row.checked ? 'is-checked' : ''}`}
                  onClick={() => patchRow(row.uid, { checked: !row.checked })}
                >
                  {row.checked ? '已选中' : '未选中'}
                </span>
              </div>

              <div className="params-row">
                <span className="param-chip">
                  音量
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="param-value"
                    onBlur={(event) => updateNumberField(row.uid, 'volume', event.currentTarget.textContent ?? '0')}
                  >
                    {row.volume}
                  </span>
                </span>
                <span className="param-chip">
                  语速
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="param-value"
                    onBlur={(event) =>
                      updateNumberField(row.uid, 'speechRate', event.currentTarget.textContent ?? '0')
                    }
                  >
                    {row.speechRate}
                  </span>
                </span>
                <span className="param-chip">
                  音调
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="param-value"
                    onBlur={(event) =>
                      updateNumberField(row.uid, 'pitchRate', event.currentTarget.textContent ?? '0')
                    }
                  >
                    {row.pitchRate}
                  </span>
                </span>
              </div>

              <div
                className="content-editable"
                contentEditable="plaintext-only"
                suppressContentEditableWarning
                onBlur={(event) => patchRow(row.uid, { content: event.currentTarget.textContent ?? '' })}
                dangerouslySetInnerHTML={{ __html: row.content.replace(/\n/g, '<br/>') }}
              />

              <div className="ai_audio_right" aria-label="语音脚本可视化预览">
                {parseContentSegments(row.content).map((segment, idx) => {
                  if (segment.type === 'prompt') {
                    return (
                      <Tag key={`${row.uid}-${idx}`} className="prompt_tag" icon={<BellOutlined />}>
                        {segment.value}
                      </Tag>
                    );
                  }
                  if (segment.type === 'pause') {
                    return (
                      <Tag key={`${row.uid}-${idx}`} className="pause_tag" icon={<FieldTimeOutlined />}>
                        {segment.value}
                      </Tag>
                    );
                  }
                  return (
                    <span key={`${row.uid}-${idx}`} className="plain-content">
                      {segment.value}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="json-preview-wrap">
        <Text strong>实时数据（JSON）</Text>
        <pre className="json-preview">{jsonPreview}</pre>
      </div>
    </Layout.Content>
  );
};

export default AudioTagEditorPage;
