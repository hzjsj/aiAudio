import {
  AudioOutlined,
  CustomerServiceOutlined,
  DownloadOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
  SoundOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Input,
  Layout,
  List,
  Progress,
  Row,
  Segmented,
  Space,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { useMemo, useState } from 'react';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

type ScriptRow = {
  id: number;
  speaker: string;
  avatar: string;
  volume: string;
  rate?: string;
  text: string;
  pause: string;
};

const voiceColorMap: Record<string, string> = {
  扬哥: '#1677ff',
  Roger: '#7a5af8',
  Guy: '#ef6820',
  Aria: '#14b8a6',
};

const workItems = [
  '期中听力测试(一)',
  '期中听力测试(二)',
  '专题英语听力-7年级',
  '样例项目',
];

const scriptRows: ScriptRow[] = [
  { id: 1, speaker: '扬哥', avatar: '扬', volume: '大声(75)', text: ' [前奏] 期中听力测试(一)', pause: '1s' },
  { id: 2, speaker: '扬哥', avatar: '扬', volume: '大声(75)', text: 'Ⅰ，短对话理解', pause: '0.5s' },
  { id: 3, speaker: '扬哥', avatar: '扬', volume: '大声(75)', text: '你将听到五段对话。每段对话后有一个小题，请在每小题所给选项中选出最佳选项。', pause: '5s' },
  { id: 4, speaker: 'Roger', avatar: 'R', volume: '大声(75)', text: '1', pause: '0.5s' },
  { id: 5, speaker: 'Guy', avatar: 'G', volume: '大声(75)', rate: '0.9', text: 'I’m going to England for my vacation next week. What should I take?', pause: '1s' },
  { id: 6, speaker: 'Aria', avatar: 'A', volume: '大声(75)', rate: '0.9', text: 'Well, I think you’d better take an umbrella.', pause: '2s' },
  { id: 7, speaker: '扬哥', avatar: '扬', volume: '大声(75)', text: 'Ⅱ，长对话理解', pause: '0.5s' },
  { id: 8, speaker: '扬哥', avatar: '扬', volume: '大声(75)', text: '你将听到两段对话，每段对话读两遍。', pause: '4s' },
  { id: 9, speaker: 'Guy', avatar: 'G', volume: '大声(75)', rate: '0.9', text: 'Do you like animals, Lisa?', pause: '1s' },
  { id: 10, speaker: 'Aria', avatar: 'A', volume: '大声(75)', rate: '0.9', text: 'Yes, I do. But many of them are in danger now.', pause: '1s' },
  { id: 11, speaker: 'Guy', avatar: 'G', volume: '大声(75)', rate: '0.9', text: 'I like pandas. They are really cute.', pause: '1s' },
  { id: 12, speaker: '扬哥', avatar: '扬', volume: '大声(75)', text: 'Ⅲ，短文理解', pause: '0.5s' },
];

export default function App() {
  const [activeRowId, setActiveRowId] = useState(2);
  const [keyword, setKeyword] = useState('');
  const [voiceFilter, setVoiceFilter] = useState<string>('全部角色');

  const voices = useMemo(
    () => ['全部角色', ...Array.from(new Set(scriptRows.map((row) => row.speaker)))],
    [],
  );

  const filteredRows = useMemo(
    () =>
      scriptRows.filter((row) => {
        const byKeyword = row.text.toLowerCase().includes(keyword.trim().toLowerCase());
        const byVoice = voiceFilter === '全部角色' || row.speaker === voiceFilter;
        return byKeyword && byVoice;
      }),
    [keyword, voiceFilter],
  );

  return (
    <Layout className="app-layout">
      <Header className="top-header">
        <Space>
          <AudioOutlined className="brand-icon" />
          <Text strong className="brand-name">AI·音频工坊</Text>
          <Tag color="processing">Beta</Tag>
        </Space>
        <Space size="large">
          <Text>当前可合成字数：11,883,500</Text>
          <Badge status="processing" text="企业版音色库" />
          <Avatar icon={<UserOutlined />} />
        </Space>
      </Header>

      <Layout>
        <Sider width={300} theme="light" className="left-sider">
          <div className="sider-title">作品列表</div>
          <Input placeholder="搜索作品" prefix={<SearchOutlined />} allowClear className="work-search" />
          <List
            dataSource={workItems}
            renderItem={(item, index) => (
              <List.Item
                className={`work-item ${index === 0 ? 'is-active' : ''}`}
                actions={[<PlusCircleOutlined key="add" />]}
              >
                <Space>
                  <FolderOpenOutlined />
                  <Text>{item}</Text>
                </Space>
              </List.Item>
            )}
          />
        </Sider>

        <Content className="main-content">
          <Card className="workspace-card" bordered={false}>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col>
                <Title level={3} style={{ margin: 0 }}>期中听力测试(一)</Title>
                <Text type="secondary">试听结果符合AI节奏标识（摩耳码），可继续批量优化。</Text>
              </Col>
              <Col>
                <Space wrap>
                  <Text>批量设置</Text>
                  <Switch defaultChecked />
                  <Button icon={<DownloadOutlined />}>下载音频</Button>
                  <Button type="primary" icon={<ReloadOutlined />}>重新合成</Button>
                </Space>
              </Col>
            </Row>

            <Row className="toolbar-row" justify="space-between" align="middle" gutter={[16, 12]}>
              <Col>
                <Space wrap>
                  <Segmented options={['拼音纠正', '英文发音', '插入停顿', '音效', '背景音乐']} />
                  <Segmented value={voiceFilter} options={voices} onChange={(value) => setVoiceFilter(String(value))} />
                </Space>
              </Col>
              <Col>
                <Space>
                  <Input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="搜索台词"
                    prefix={<SearchOutlined />}
                    allowClear
                  />
                  <Segmented options={['16K标准试听', '48K高保真']} />
                  <Tooltip title="试听当前片段">
                    <Button type="text" shape="circle" icon={<PlayCircleOutlined />} />
                  </Tooltip>
                </Space>
              </Col>
            </Row>

            <List
              className="script-list"
              dataSource={filteredRows}
              renderItem={(item) => (
                <List.Item
                  className={`script-row ${activeRowId === item.id ? 'is-active' : ''}`}
                  onClick={() => setActiveRowId(item.id)}
                >
                  <div className="row-index">{item.id}</div>
                  <div className="row-content">
                    <Space size={12} wrap>
                      <Avatar
                        size="small"
                        style={{ background: voiceColorMap[item.speaker] ?? '#8c8c8c' }}
                      >
                        {item.avatar}
                      </Avatar>
                      <Tag>{item.speaker}</Tag>
                      {item.rate ? <Tag color="gold">语速 {item.rate}</Tag> : null}
                      <Tag color="cyan">{item.volume}</Tag>
                    </Space>
                    <Text className="script-text">{item.text}</Text>
                  </div>
                  <div className="row-actions">
                    <Tag color="blue">停顿 {item.pause}</Tag>
                    <Button size="small" icon={<CustomerServiceOutlined />}>试听</Button>
                  </div>
                </List.Item>
              )}
            />

            <Row justify="space-between" align="middle" className="footer-stats" gutter={[16, 8]}>
              <Col>
                <Space>
                  <FileTextOutlined />
                  <Text>多音字检测</Text>
                  <Tag color="warning">2 处待确认</Tag>
                </Space>
              </Col>
              <Col>
                <Space>
                  <SoundOutlined />
                  <Text type="secondary">已筛选 {filteredRows.length} / {scriptRows.length} 条</Text>
                </Space>
              </Col>
              <Col>
                <Space direction="vertical" size={0}>
                  <Text type="secondary">字数：4933 / 50000</Text>
                  <Progress percent={9.8} showInfo={false} size="small" style={{ width: 220 }} />
                </Space>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
