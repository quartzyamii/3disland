import React, { useState } from 'react';

const RotationDebugger = ({ IslandRef, targetRotations, hoveredObject, frameRate }) => {
  // 디버깅을 위한 state들
  const [debugMode, setDebugMode] = useState(false);
  const [recordedRotations, setRecordedRotations] = useState({});
  const [manualRotation, setManualRotation] = useState(4.7); // 초기값
  const [showRayHelper, setShowRayHelper] = useState(false);

  // 현재 회전값을 실시간으로 보여주는 함수
  const getCurrentRotationInfo = () => {
    if (!IslandRef?.current) return null;
    
    const currentY = IslandRef.current.rotation.y;
    const relativeY = currentY - 4.7; // 초기 회전값 제외
    const degrees = (currentY * 180 / Math.PI);
    const relativeDegrees = (relativeY * 180 / Math.PI);
    
    return {
      absolute: currentY,
      relative: relativeY,
      absoluteDegrees: degrees,
      relativeDegrees: relativeDegrees
    };
  };

  // 수동으로 회전시키는 함수
  const setManualRotationValue = (value) => {
    if (IslandRef?.current) {
      IslandRef.current.rotation.y = value;
      setManualRotation(value);
    }
  };

  // 현재 위치를 특정 오브젝트의 정확한 위치로 기록
  const recordCurrentPosition = (objectName) => {
    const rotationInfo = getCurrentRotationInfo();
    if (rotationInfo) {
      const newRecorded = {
        ...recordedRotations,
        [objectName]: {
          absolute: rotationInfo.absolute,
          relative: rotationInfo.relative,
          degrees: rotationInfo.relativeDegrees
        }
      };
      setRecordedRotations(newRecorded);
      
      console.log(`=== ${objectName.toUpperCase()} POSITION RECORDED ===`);
      console.log(`Absolute: ${rotationInfo.absolute.toFixed(6)} rad`);
      console.log(`Relative: ${rotationInfo.relative.toFixed(6)} rad`);
      console.log(`Degrees: ${rotationInfo.relativeDegrees.toFixed(2)}°`);
      console.log('Copy this value to targetRotations:');
      console.log(`${objectName}: ${rotationInfo.absolute.toFixed(6)},`);
    }
  };

  // 기록된 모든 각도를 출력
  const exportRecordedRotations = () => {
    console.log('=== RECORDED ROTATIONS FOR COPY-PASTE ===');
    console.log('const targetRotations = {');
    Object.entries(recordedRotations).forEach(([key, value]) => {
      console.log(`  ${key}: ${value.absolute.toFixed(6)}, // ${value.degrees.toFixed(2)}°`);
    });
    console.log('};');
    
    // 클립보드에도 복사
    const rotationString = `const targetRotations = {\n${
      Object.entries(recordedRotations)
        .map(([key, value]) => `  ${key}: ${value.absolute.toFixed(6)}, // ${value.degrees.toFixed(2)}°`)
        .join('\n')
    }\n};`;
    
    navigator.clipboard.writeText(rotationString).then(() => {
      console.log('✅ Rotations copied to clipboard!');
      alert('새로운 targetRotations이 클립보드에 복사되었습니다!');
    }).catch((err) => {
      console.log('클립보드 복사 실패:', err);
    });
  };

  // 현재 회전 정보를 가져오기
  const rotInfo = getCurrentRotationInfo();

  return (
    <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 p-4 rounded text-white max-w-sm">
      <div className="flex flex-col gap-2 text-sm">
        {/* 기존 컨트롤 */}
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={showRayHelper}
            onChange={(e) => setShowRayHelper(e.target.checked)}
          />
          Show Ray Helper
        </label>

        {/* 디버그 모드 토글 */}
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={debugMode}
            onChange={(e) => setDebugMode(e.target.checked)}
          />
          🔧 Debug Mode
        </label>

        {/* 현재 회전 정보 */}
        {rotInfo && (
          <div className="bg-gray-800 p-2 rounded text-xs">
            <div>Current Y: {rotInfo.absolute.toFixed(3)} rad</div>
            <div>Relative: {rotInfo.relative.toFixed(3)} rad</div>
            <div>Degrees: {rotInfo.relativeDegrees.toFixed(1)}°</div>
          </div>
        )}

        {hoveredObject && (
          <div className="bg-blue-900 p-2 rounded">
            <div>Hovered: <span className="text-green-400">{hoveredObject}</span></div>
            <div className="text-xs mt-1">
              Current Target: {targetRotations[hoveredObject]?.toFixed(3)} rad
            </div>
          </div>
        )}

        {/* 디버그 모드 컨트롤들 */}
        {debugMode && (
          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="text-xs text-yellow-300 mb-2 font-bold">📍 POSITION RECORDING TOOL</div>
            
            {/* 사용법 안내 */}
            <div className="text-xs text-blue-200 mb-3 p-2 bg-blue-900 bg-opacity-50 rounded">
              <div className="font-semibold mb-1">사용법:</div>
              <div>1. 슬라이더로 오브젝트를 정면에 맞춰주세요</div>
              <div>2. "Record" 버튼을 눌러 위치를 저장하세요</div>
              <div>3. 모든 오브젝트 완료 후 "Export"를 클릭하세요</div>
            </div>
            
            {/* 수동 회전 슬라이더 */}
            <div className="mb-3">
              <label className="text-xs font-semibold text-yellow-300">Manual Rotation:</label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.01"
                value={manualRotation}
                onChange={(e) => setManualRotationValue(parseFloat(e.target.value))}
                className="w-full mt-1"
              />
              <div className="text-xs text-center mt-1">{manualRotation.toFixed(3)} rad ({((manualRotation - 4.7) * 180 / Math.PI).toFixed(1)}°)</div>
            </div>

            {/* 각 오브젝트별 기록 버튼 */}
            <div className="grid grid-cols-2 gap-1 mb-3">
              {Object.keys(targetRotations).map(objName => (
                <button
                  key={objName}
                  onClick={() => recordCurrentPosition(objName)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    recordedRotations[objName] 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-gray-200'
                  }`}
                >
                  {recordedRotations[objName] ? '✅' : '📍'} {objName}
                </button>
              ))}
            </div>

            {/* 기록된 데이터 출력 */}
            {Object.keys(recordedRotations).length > 0 && (
              <button
                onClick={exportRecordedRotations}
                className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-xs w-full font-semibold transition-colors"
              >
                📋 Export All ({Object.keys(recordedRotations).length})
              </button>
            )}

            {/* 기록된 각도 미리보기 */}
            {Object.keys(recordedRotations).length > 0 && (
              <div className="mt-2 bg-gray-800 p-2 rounded text-xs max-h-24 overflow-y-auto">
                <div className="text-green-300 font-semibold mb-1">Recorded:</div>
                {Object.entries(recordedRotations).map(([key, value]) => (
                  <div key={key} className="text-green-300 flex justify-between">
                    <span>{key}:</span>
                    <span>{value.degrees.toFixed(1)}°</span>
                  </div>
                ))}
              </div>
            )}

            {/* 진행 상황 */}
            <div className="mt-2 text-xs">
              <div className="text-cyan-300">
                Progress: {Object.keys(recordedRotations).length}/{Object.keys(targetRotations).length} objects
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                <div 
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(Object.keys(recordedRotations).length / Object.keys(targetRotations).length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* 프레임율 표시 */}
        <div className="text-sm border-t border-gray-600 pt-2 mt-2">
          <div className="text-cyan-400">
            FPS: <span className="font-mono">{frameRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotationDebugger;
