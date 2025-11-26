import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
export type  TriggerType = "action" | "trigger"
interface NodeType {
  data:{
    type:"action"|"trigger",
    kind:"price-trigger"|"timer-trigger"|"hyperliquid"|"backpack"|"lighter",
    label?:string,
  },
  id:string,
  position:{x:number,y:number},
}
interface EdgeType {
  id:string,
  source:string,
  target:string,
} 
export default function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
 
  const onNodesChange = useCallback(
    (changes:any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes:any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params:any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {
        !nodes.length && <TriggerSheet onSelect={(type,metadata)=>{
         setNodes([...nodes,{
          id:`node-${nodes.length+1}`,
          position:{x:100,y:100},
          data:{type:"trigger",kind:metadata.kind}
         }])
        }}/>
      }
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}