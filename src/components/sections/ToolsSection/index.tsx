"use client";
import React from 'react';
import ToolsTemplate from './ToolsTemplate';
import toolsData from './toolsData';

export default function ToolsSection() {
  return <ToolsTemplate tools={toolsData.home} />;
}

export { toolsData };


