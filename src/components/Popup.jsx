import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center z-50 mr-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[600px]">
        <div className="flex gap-6">
          {/* 이미지 영역 */}
          <div className="w-1/3">
            <div className="w-full h-48 bg-gray-200 rounded-lg">
              {/* 이미지가 들어갈 영역 */}
            </div>
          </div>
          
          {/* 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">파이브-미닛키즈 야광팔찌</h2>
              <div className="w-full h-px bg-gray-200 mb-4"></div>
              <p className="text-gray-600">2024년 10월의 야광팔찌</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup; 