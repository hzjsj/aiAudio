import {
  AudioOutlined,
  DownloadOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Layout,
  List,
  Progress,
  Row,
  Segmented,
  Space,
  Switch,
  Tag,
  Typography,
} from 'antd';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const scriptRows = [
  { id: 1, role: '扬声', text: '期中听力测试(一)', duration: '1s' },
  { id: 2, role: '扬声', text: 'I，短对话理解', duration: '0.5s' },
  { id: 3, role: '扬声', text: '你好听到五段对话。每段对话后有一个小题...', duration: '5s' },
  { id: 4, role: 'Roger', text: 'I’m going to England for my vacation next week.', duration: '1s' },
  { id: 5, role: 'Aria', text: 'Well, I think you’d better take an umbrella', duration: '2s' },
];

export default function App() {
  return (
    <Layout className="app-layout">
      <Header className="top-header">
        <Space>
          <AudioOutlined className="brand-icon" />
          <Text strong className="brand-name">AI·听书</Text>
        </Space>
        <Space>
          <Text>当前可合成字数：11,883,500</Text>
          <Badge status="processing" text="连读词库" />
          <Avatar icon={<UserOutlined />} />
        </Space>
      </Header>

      <Layout>
        <Sider width={280} theme="light" className="left-sider">
          <div className="sider-title">作品列表</div>
          <List
            dataSource={['期中听力测试(一)', '测试', '期中听力测试(一) 2 2']}
            renderItem={(item) => (
              <List.Item className="work-item" actions={[<PlusCircleOutlined key="add" />]}>
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
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={3} style={{ margin: 0 }}>期中听力测试(一)</Title>
                <Text type="secondary">试听结果符合AI节奏标识（摩耳码）</Text>
              </Col>
              <Col>
                <Space>
                  <Text>批量设置</Text>
                  <Switch />
                  <Button icon={<DownloadOutlined />}>下载</Button>
                  <Button type="primary" icon={<ReloadOutlined />}>重新合成</Button>
                </Space>
              </Col>
            </Row>

            <Row className="toolbar-row" justify="space-between" align="middle">
              <Col>
                <Segmented options={['拼音纠正', '英文发音', '插入停顿', '音效', '背景音乐']} />
              </Col>
              <Col>
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <Segmented options={['16K标准音质试听', '48K高保真']} />
                  <Button shape="circle" icon={<PlayCircleOutlined />} />
                </Space>
              </Col>
            </Row>

            <List
              className="script-list"
              dataSource={scriptRows}
              renderItem={(item) => (
                <List.Item className="script-row">
                  <Space>
                    <Text type="secondary">{item.id}</Text>
                    <Avatar size="small">{item.role[0]}</Avatar>
                    <Tag>{item.role}</Tag>
                    <Text>{item.text}</Text>
                    <Tag color="cyan">{item.duration}</Tag>
                  </Space>
                </List.Item>
              )}
            />

            <Row justify="space-between" className="footer-stats">
              <Col>
                <Space>
                  <FileTextOutlined />
                  <Text>多音字检测</Text>
                </Space>
              </Col>
              <Col>
                <Space direction="vertical" size={0}>
                  <Text type="secondary">字数：4933/50000</Text>
                  <Progress percent={9.8} showInfo={false} size="small" />
                </Space>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
