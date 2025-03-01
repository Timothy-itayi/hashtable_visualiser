"use client"

import { HashTableKV } from "@/components/hash_table"
import { HashTable } from "@/components/hashtable"
import { useState } from "react"

export default function HashTableVisualizer() {
  const [activeTab, setActiveTab] = useState('simple')

  return (
    <><div className="window" style={{ marginTop: '16px', margin: '32px auto', maxWidth: '400px' }}>
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
  
          <h4>Two Types of Hash Tables:</h4>
          <div style={{ marginLeft: '1rem' }}>
            <p><strong>Simple Hash Table:</strong></p>
            <ul>
              <li>Stores single values (strings)</li>
              <li>Similar to a basic array with hashed indices</li>
              <ul>
  <li>Example: &quot;hello&quot; → index 0</li>
</ul>

<p><strong>Key-Value Hash Table:</strong></p>
<ul>
  <li>Stores pairs of values (like a dictionary)</li>
  <li>The key is hashed to determine storage location</li>
  <li>Example: &quot;name&quot;: &quot;John&quot; → index 0</li>
</ul>

              <li>More like real-world hash table implementations</li>
            </ul>
          </div>

          <h4>Operations:</h4>
          <ul>
            <li><strong>Insert:</strong> Adds a value (or key-value pair) at its computed hash index</li>
            <li><strong>Delete:</strong> Removes a value (or key-value pair) from its hash index</li>
            <li><strong>Search:</strong> Finds a value (or key-value pair) by computing its hash index</li>
          </ul>

          <p><em>Note: This is a teaching tool to visualize how hash tables work internally. Real hash tables (like JavaScript objects) use more sophisticated hashing algorithms.</em></p>
        </div>
      </div>
    </div><div style={{ margin: '32px auto', maxWidth: '1000px' }}>
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
            <div className="tabs">
              <div className="tab-bar">
                <button
                  className={`tab ${activeTab === 'simple' ? 'active' : ''}`}
                  onClick={() => setActiveTab('simple')}
                >
                  Simple Hash Table
                </button>
                <button
                  className={`tab ${activeTab === 'keyvalue' ? 'active' : ''}`}
                  onClick={() => setActiveTab('keyvalue')}
                >
                  Key-Value Hash Table
                </button>
              </div>
              <div className="tab-content">
                {activeTab === 'simple' ? <HashTable /> : <HashTableKV />}
              </div>
            </div>
          </div>
          <div className="status-bar">
            <p className="status-bar-field"> ㋛ Made by <a href="https://timothyitayi.com">Timothy Itayi</a> to help visualize hash tables</p>
          </div>
        </div>
      </div></>
  )
}