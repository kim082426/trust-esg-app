// Trust ESG MVP 와이어프레임 UI (React + Tailwind + GPT 연결)

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function TrustESGMVP() {
  const [criteria, setCriteria] = useState('gri');
  const [reportText, setReportText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://trust-esg-gpt-proxy.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: reportText, criteria }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ content: '오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Trust ESG - 보고서 검증 MVP</h1>

      {/* 기준 선택 */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="font-semibold mb-2">📚 기준 선택</h2>
          <Tabs defaultValue="gri" onValueChange={setCriteria} className="mb-2">
            <TabsList>
              <TabsTrigger value="gri">GRI</TabsTrigger>
              <TabsTrigger value="sasb">SASB</TabsTrigger>
              <TabsTrigger value="tcfd">TCFD</TabsTrigger>
              <TabsTrigger value="kesg">K-ESG</TabsTrigger>
              <TabsTrigger value="csrd">CSRD</TabsTrigger>
              <TabsTrigger value="sdgs">UN-SDGs / K-SDGs</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* 보고서 텍스트 입력 */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="font-semibold mb-2">📄 보고서 내용 입력</h2>
          <Textarea
            placeholder="ESG 보고서 텍스트를 입력해주세요..."
            className="h-40"
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
          />
          <Button className="mt-3" onClick={handleCheck} disabled={loading}>
            {loading ? '검증 중...' : 'AI로 검증 시작'}
          </Button>
        </CardContent>
      </Card>

      {/* 검증 결과 */}
      {result && (
        <Card className="mb-4">
          <CardContent>
            <h2 className="font-semibold mb-2">✅ 검증 결과 요약</h2>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {result.content}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* 넥서스 및 지역사회 연계 분석 */}
      <Card>
        <CardContent>
          <h2 className="font-semibold mb-2">🌐 넥서스 관점 및 지역사회 정책 연계</h2>
          <p className="text-sm text-gray-600 mb-1">이 보고서는 물-식량-에너지 넥서스 중 "에너지 절감"에 기여하는 활동이 포함되어 있습니다.</p>
          <p className="text-sm text-gray-600 mb-1">지역사회 측면에서, 기업의 활동 지역(예: 서울시)에서는 2050 탄소중립 계획과 연계된 정책이 시행 중입니다.</p>
          <p className="text-sm text-gray-600">이 보고서는 해당 정책 목표와의 연관성을 일정 수준 갖고 있으며, 지역 연계도 분석 결과 '중간 이상'으로 분류됩니다.</p>
        </CardContent>
      </Card>
    </div>
  );
}