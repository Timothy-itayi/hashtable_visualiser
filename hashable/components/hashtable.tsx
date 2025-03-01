"use client"

import { useState, useEffect } from "react"

interface HashTableProps {
  className?: string
}

interface StoredHashTableData {
  hashTable: Record<number, string[]>
  tableSize: number
}

export function HashTable({ className }: HashTableProps) {
  const [hashTable, setHashTable] = useState<Record<number, string[]>>({})
  const [tableSize, setTableSize] = useState(7)
  const [input, setInput] = useState("")
  const [operation, setOperation] = useState("insert")
  const [result, setResult] = useState("")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Load saved data on initial mount
  useEffect(() => {
    const savedData = localStorage.getItem('hashTableData')
    console.log('Loading saved data:', savedData)
    
    if (savedData) {
      const parsedData = JSON.parse(savedData) as StoredHashTableData
      console.log('Parsed saved data:', parsedData)
      setHashTable(parsedData.hashTable)
      setTableSize(parsedData.tableSize)
    } else {
      // Initialize empty hash table
      initializeEmptyTable(tableSize)
    }
  }, [])

  // Initialize empty hash table
  const initializeEmptyTable = (size: number) => {
    console.log('Initializing empty table of size:', size)
    const newHashTable: Record<number, string[]> = {}
    for (let i = 0; i < size; i++) {
      newHashTable[i] = []
    }
    setHashTable(newHashTable)
    saveToLocalStorage(newHashTable, size)
  }

  // Save to localStorage
  const saveToLocalStorage = (table: Record<number, string[]>, size: number) => {
    const dataToSave: StoredHashTableData = {
      hashTable: table,
      tableSize: size
    }
    console.log('Saving to localStorage:', dataToSave)
    localStorage.setItem('hashTableData', JSON.stringify(dataToSave))
  }

  // Handle table size change
  const handleTableSizeChange = (newSize: number) => {
    console.log('Changing table size from', tableSize, 'to', newSize)
    setTableSize(newSize)
    initializeEmptyTable(newSize)
  }

  // Simple hash function
  const hash = (key: string): number => {
    let hashValue = 0
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i)
    }
    return hashValue % tableSize
  }

  const handleOperation = () => {
    if (!input.trim()) {
      setResult("Please enter a value")
      return
    }

    const index = hash(input)
    console.log('Operation:', operation, 'Input:', input, 'Hash index:', index)
    setActiveIndex(index)

    setTimeout(() => {
      if (operation === "insert") {
        if (!hashTable[index].includes(input)) {
          const newHashTable = { ...hashTable }
          newHashTable[index] = [...newHashTable[index], input]
          console.log('Inserting value, new hash table:', newHashTable)
          setHashTable(newHashTable)
          saveToLocalStorage(newHashTable, tableSize)
          setResult(`Inserted "${input}" at index ${index}`)
        } else {
          console.log('Value already exists:', input, 'at index:', index)
          setResult(`"${input}" already exists at index ${index}`)
        }
      } else if (operation === "delete") {
        if (hashTable[index].includes(input)) {
          const newHashTable = { ...hashTable }
          newHashTable[index] = newHashTable[index].filter((item) => item !== input)
          console.log('Deleting value, new hash table:', newHashTable)
          setHashTable(newHashTable)
          saveToLocalStorage(newHashTable, tableSize)
          setResult(`Deleted "${input}" from index ${index}`)
        } else {
          console.log('Value not found for deletion:', input, 'at index:', index)
          setResult(`"${input}" not found at index ${index}`)
        }
      } else if (operation === "search") {
        const found = hashTable[index].includes(input)
        console.log('Searching for:', input, 'at index:', index, 'Found:', found)
        setResult(found ? `Found "${input}" at index ${index}` : `"${input}" not found`)
      }

      setTimeout(() => {
        setActiveIndex(null)
      }, 1000)
    }, 500)
  }

  const handleClear = () => {
    console.log('Clearing hash table')
    initializeEmptyTable(tableSize)
    setResult("Hash table cleared")
  }

  return (
    <div className={className}>
 <div className="field-row-stacked">
  <label>Operation:</label>
  <div className="button-group">
    <button 
      className={operation === "insert" ? "active" : ""}
      onClick={() => setOperation("insert")}
    >
      Insert
    </button>
    <button 
      className={operation === "delete" ? "active" : ""}
      onClick={() => setOperation("delete")}
    >
      Delete
    </button>
    <button 
      className={operation === "search" ? "active" : ""}
      onClick={() => setOperation("search")}
    >
      Search
    </button>
  </div>
</div>

      <div className="field-row-stacked">
        <label htmlFor="value">Value:</label>
        <input
          id="value"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
        />
      </div>

      <div className="field-row">
        <button onClick={handleOperation}>Execute</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      <div className="field-row-stacked">
  <label htmlFor="tableSize">Table Size:</label>

    <select
      id="tableSize"
      value={tableSize.toString()} 
      onChange={(e) => handleTableSizeChange(Number.parseInt(e.target.value))}
    >
      <option value="5">5</option>
      <option value="7">7</option>
      <option value="11">11</option>
      <option value="13">13</option>
    </select>

</div>

      <div className="sunken-panel" style={{ padding: '1rem', marginTop: '1rem' }}>
        <p>{result}</p>
      </div>

      <div className="sunken-panel" style={{ padding: '1rem', marginTop: '1rem' }}>
        {Object.keys(hashTable).map((index) => (
          <div
            key={index}
            className={`field-row ${Number.parseInt(index) === activeIndex ? "selected" : ""}`}
            style={{ marginBottom: '0.5rem' }}
          >
            <div className="cell-index">
              {index}
            </div>
            <div className="cell-content">
              {hashTable[Number.parseInt(index)].length > 0 ? (
                hashTable[Number.parseInt(index)].map((item, i) => (
                  <span key={i} className="value-tag">
                    {item}
                  </span>
                ))
              ) : (
                <span className="empty-text">Empty</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
