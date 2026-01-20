  import React, { useState, useEffect } from "react";
  import { Input, Button, Checkbox, Row, Col, Card, Select, Tooltip } from "antd";
  import { EyeOutlined, CheckOutlined, SaveOutlined } from "@ant-design/icons";
  

  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    color: "#555",
    marginBottom: 4,
  };

  const tradingPlatformMap: Record<string, string[]> = {
    "5Paisa": ["FP_API_TOTP", "XTS_FIVE_PAISA"],
    "AC Agarwal": ["XTS_AGARWAL"],
    "AETRAM": ["XTS_AETRAM", "XTS_AETRAM_IPV6"],
    "AliceBlue": ["ALICE_API", "ALICE_API_IPV6"],
    "Ambalal": ["XTS_AMBALAL"],
    "AnandRathi": ["XTS_A_RATHI_IPV6", "XTS_ANAND_RATHI"],
    "Angel": ["SMART_API_IPV6", "SMART_API", "SMART_API_M"],
    "ARHAM": ["XTS_ARHAM"],
    "ATS": ["XTS_ATS"],
    "Axis": ["XTS_AXIS"],
    "Choice": ["CHOICE_API", "CHOICE_API_TOTP", "CHOICE_API_IPV6"],
    "DBOnline": ["XTS_DEONLINE"],
    "Dhan": ["DHAN_V2_AT_IPV6", "DHAN_V2_IPV6", "DHAN_V2"],
    "Eureka": ["XTS_EUREKA"],
    "Eureka - PROP": ["XTS_EUREKA_PROP_IPV6", "XTS_EUREKA_PROP"],
    "Finvasia": ["SHOONYA_BETA", "KAMBALA_FINVASIA"],
    "Flattrade": ["KAMBALA_FLATTRADE"],
    "Fyers": ["FYERS_API_IPV6", "FYERS_API"],
    "IIFL": ["IIFL_MKT_API_IPV6", "IIFL_API", "XTS_IIFL"],
    "Jainam": ["XTS_JAINAM", "XTS_JAINAM_IPV6"],
    "Jainam - PROP": [
      "XTS_JAINAM_PROP_A",
      "XTS_JAINAM_PROP_B",
      "XTS_JAINAM_PROP_C",
      "XTS_JAINAM_PROP_D",
    ],
    "Kotak": ["KOTAK_NEO", "KOTAK_NEO_TOTP"],
    "Mastertrust": ["MASTERTRUST"],
    "MLB": ["XTS_MLB"],
    "Motilal": ["MOTILAL_API", "MOTILAL_API_IPV6", "XTS_MOTILAL"],
    "Nuvama": ["NUVAMA_RETAIL"],
    "PESB": ["XTS_PESB"],
    "Prabhudas Lilladher": ["KAMBALA_PLINDIA"],
    "Profitmart": ["KAMBALA_PROFITMART"],
    "Religare": ["XTS_RELIGARE"],
    "Rmoney": ["XTS_RMONEY"],
    "SAS": ["SAS", "SAS_STOCKO_API", "SAS_STOCKO_API_IPV6"],
    "Share India": ["XTS_SHARE_IND"],
    "Share India - PROP": ["XTS_SHARE_IND_PROP", "XTS_SHARE_IND_PROP_M"],
    "SMC": ["XTS_SMC"],
    "SW Capital": ["XTS_SW_CAPITAL", "XTS_SW_CAPITAL_IPV6"],
    "Tradejini": ["KAMBALA_TRADEJINI"],
    "Tradeswift": ["XTS_TSWIFT"],
    "Upstox": ["UPSTOX", "UPSTOX_API", "UPSTOX_API_IPV6"],
    "WisdomCapital": ["XTS_WISDOM"],
    "Zebu": ["MYNT_API", "MYNT_API_IPV6", "XTS_ZEBU"],
    "Zerodha": ["ZERODHA_API_IPV6","ZERODHA_API", "ZERODHA_API_M_IPV6", "ZERODHA_API_M", "KITE_IPV6", "KITE"],
  };

  const brokerOptions = [
    "5Paisa",
    "AC Agarwal",
    "AETRAM",
    "AliceBlue",
    "Ambalal",
    "AnandRathi",
    "Angel",
    "ARHAM",
    "ATS",
    "Axis",
    "Choice",
    "DBOnline",
    "Dhan",
    "Eureka",
    "Eureka - PROP",
    "Finvasia",
    "Flattrade",
    "Fyers",
    "IIFL",
    "Jainam",
    "Jainam - PROP",
    "Kotak",
    "Mastertrust",
    "MLB",
    "Motilal",
    "Nuvama",
    "PESB",
    "Prabhudas Lilladher",
    "Profitmart",
    "Religare",
    "Rmoney",
    "SAS",
    "Share India",
    "Share India - PROP",
    "SMC",
    "SW Capital",
    "Tradejini",
    "Tradeswift",
    "Upstox",
    "WisdomCapital",
    "Zebu",
    "Zerodha",
  ];

  const CreateTradingAccount: React.FC = () => {
        const [broker, setBroker] = useState("5Paisa");
        const [platform, setPlatform] = useState<string | undefined>(undefined);

        const [mpin, setMpin] = useState("");
        const [showMpin, setShowMpin] = useState(false);

        const [totp, setTotp] = useState("");
        const [showTotp, setShowTotp] = useState(false);

        const [apiKey, setApiKey] = useState("");
        const [showApiKey, setShowApiKey] = useState(false);

        const [appSource, setAppSource] = useState("");


        useEffect(() => {
          const platforms = tradingPlatformMap[broker];
          if (platforms && platforms.length > 0) {
            setPlatform(platforms[0]);
          }
        }, [broker]);

    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ color: "#00a6a6", marginBottom: 4 }}>
          Trading Account
        </h1>

        <p style={{ color: "#c45a00", marginBottom: 4 }}>
          Add your trading account details here
        </p>

        <p style={{ color: "#c45a00", marginBottom: 24 }}>
          Your trading account information is completely secure, more details are
          available in <b>Security Concerns</b>.
        </p>

        <Row justify="center">
          <Col xs={24} sm={22} md={16} lg={12}>
            <Card bordered>

              <label style={{ fontWeight: 600 }}>Stock Broker</label>
              <Select
                  value={broker}
                  onChange={(value) => setBroker(value)}
                  showSearch
                  style={{ width: "100%", marginBottom: 16 }}
                >
                {brokerOptions.map((b) => (
                  <Select.Option key={b} value={b}>
                    {b}
                  </Select.Option>
                ))}
              </Select>

              <Button
                block
                style={{
                  background: "#11c26d",
                  color: "#fff",
                  marginTop: 12,
                  marginBottom: 20,
                }}
              >
                Need HELP? Click Here!
              </Button>

              <label style={{ fontWeight: 600 }}>Trading Platform</label>

              <Select
                value={platform}
                onChange={setPlatform}
                placeholder="Select Trading Platform"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {(tradingPlatformMap[broker] || []).map((p) => (
                  <Select.Option key={p} value={p}>
                    {p}
                  </Select.Option>
                ))}
              </Select>

              <Button
                block
                style={{
                  background: "#00a6a6",
                  color: "#fff",
                  marginTop: 12,
                  marginBottom: 20,
                }}
              >
                Get Static IP
              </Button>

              <div style={labelStyle}>Trading Platform Login ID</div>
              <Tooltip
                title="Login ID should be exactly same (capital or small case) as you enter while logging into your trading platform"
                placement="right"
                color="#000"
              >
                <Input
                  placeholder="Trading Platform Login ID"
                  suffix={<CheckOutlined />}
                  style={{ marginBottom: 16 }}
                />
              </Tooltip>

              <div style={labelStyle}>MPIN</div>
              <Input
                type={showMpin ? "text" : "password"}
                value={mpin}
                onChange={(e) => setMpin(e.target.value)}
                placeholder="Enter your 6-digit MPIN"
                suffix={<EyeOutlined />}
              />
              <Checkbox
                checked={showMpin}
                onChange={(e) => setShowMpin(e.target.checked)}
                style={{ margin: "8px 0 16px" }}
              >
                Show password
              </Checkbox>

              <div style={labelStyle}>TOTP Key</div>
              <Input
                type={showTotp ? "text" : "password"}
                value={totp}
                onChange={(e) => setTotp(e.target.value)}
                placeholder="TOTP Key (click help button)"
                suffix={<EyeOutlined />}
              />
              <Checkbox
                checked={showTotp}
                onChange={(e) => setShowTotp(e.target.checked)}
                style={{ margin: "8px 0 16px" }}
              >
                Show
              </Checkbox>


              <div style={labelStyle}>User Key (API)</div>
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="User key (API)"
                suffix={<EyeOutlined />}
              />
              <Checkbox
                checked={showApiKey}
                onChange={(e) => setShowApiKey(e.target.checked)}
                style={{ margin: "8px 0 16px" }}
              >
                Show
              </Checkbox>

              <div style={labelStyle}>App Source (API)</div>
                <Input
                  value={appSource}
                  onChange={(e) => setAppSource(e.target.value)}
                  placeholder="App Source (API)"
                  suffix={<CheckOutlined />}
                  style={{ marginBottom: 16 }}
                />

              <div style={labelStyle}>Pseudo Name (Nickname)</div>
              <Tooltip
                title="Pseudo Name (A nickname to easily identify the account)"
                placement="right"
                color="#000"
              >
                <Input
                  placeholder="Easy to remember nickname"
                  suffix={<CheckOutlined />}
                />
              </Tooltip>

              <Checkbox style={{ margin: "8px 0 24px" }}>
                Use trading account login id as nickname
              </Checkbox>

              <Row justify="end" gutter={12}>
                <Col>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    style={{
                      backgroundColor: "#11c26d",
                      borderColor: "#11c26d",
                      height: 36,
                      minWidth: 110,
                      borderRadius: 6,
                      fontWeight: 600,
                    }}
                  >
                    Validate
                  </Button>
                </Col>
                  
                <Col>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    style={{
                      backgroundColor: "#00a6a6",
                      borderColor: "#00a6a6",
                      height: 36,
                      minWidth: 110,
                      borderRadius: 6,
                      fontWeight: 600,
                    }}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  export default CreateTradingAccount;
