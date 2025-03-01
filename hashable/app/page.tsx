"use client"

import { HashTable } from "@/components/hashtable"

export default function HashTableVisualizer() {
  return (

    <><div className="window" style={{ marginTop: '16px', margin: '32px auto' , maxWidth: '400px' }}>
      <div className="title-bar">
        <div className="title-bar-text">README.txt</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div style={{ 
          padding: '0.5rem',
          width: '100%',
          maxWidth: '800px',
          margin: '32px auto',
          textAlign: 'left'
        }}>
          <h4>How This Hash Table Works:</h4>
          <p>This visualizer demonstrates the basic concept of hash tables:</p>
          <ol>
            <li>When you input a string (e.g., "hello"):</li>
            <li>Each character is converted to its ASCII value ('h'=104, 'e'=101, etc.)</li>
            <li>These values are summed (e.g., 104+101+108+108+111 = 532)</li>
            <li>The sum is divided by table size, remainder is the index (e.g., 532 % 7 = 0)</li>
            <li>The string is stored at that index</li>
          </ol>
          <p>If multiple strings hash to the same index, they're stored together (collision handling).</p>
          <p>Operations:</p>
          <ul>
            <li><strong>Insert:</strong> Adds a value at its computed hash index</li>
            <li><strong>Delete:</strong> Removes a value from its hash index</li>
            <li><strong>Search:</strong> Finds a value by computing its hash index</li>
          </ul>
        </div>
      </div>
    </div>
    <div style={{ margin: '32px auto', maxWidth: '1000px' }}>
        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">HashTable Visualizer</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div>
          </div>
          <div className="window-body">
            <HashTable />
          </div>
          <div className="status-bar">
            <p className="status-bar-field"> ㋛ Made by <a href="https://timothyitayi.com">Timothy Itayi</a> to help visualize hash tables</p>
        </div>

</div>
</div>
</>
  )
}