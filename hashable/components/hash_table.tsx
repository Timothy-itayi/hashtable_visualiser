"use client"

import { useState, useEffect } from "react"

interface HashTableProps {
  className?: string
}

interface HashEntry {
  key: string
  value: string
}

interface StoredHashTableData {
  hashTable: Record<number, HashEntry[]>
  tableSize: number
}

export function HashTableKV({ className }: HashTableProps) {
  const [hashTable, setHashTable] = useState<Record<number, HashEntry[]>>({})
  const [tableSize, setTableSize] = useState(7)
  const [keyInput, setKeyInput] = useState("")
  const [valueInput, setValueInput] = useState("")
  const [operation, setOperation] = useState("insert")
  const [result, setResult] = useState("")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Load saved data on initial mount
  useEffect(() => {
    const savedData = localStorage.getItem('hashTableKVData')
    if (savedData) {
      const parsedData = JSON.parse(savedData) as StoredHashTableData
      setHashTable(parsedData.hashTable)
      setTableSize(parsedData.tableSize)
    } else {
      initializeEmptyTable(tableSize)
    }
  }, [])

  const initializeEmptyTable = (size: number) => {
    const newHashTable: Record<number, HashEntry[]> = {}
    for (let i = 0; i < size; i++) {
      newHashTable[i] = []
    }
    setHashTable(newHashTable)
    saveToLocalStorage(newHashTable, size)
  }

  const saveToLocalStorage = (table: Record<number, HashEntry[]>, size: number) => {
    const dataToSave: StoredHashTableData = {
      hashTable: table,
      tableSize: size
    }
    localStorage.setItem('hashTableKVData', JSON.stringify(dataToSave))
  }

  const handleTableSizeChange = (newSize: number) => {
    setTableSize(newSize)
    initializeEmptyTable(newSize)
  }

  const hash = (key: string): number => {
    let hashValue = 0
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i)
    }
    return hashValue % tableSize
  }

  const handleOperation = () => {
    if (!keyInput.trim()) {
      setResult("Please enter a key")
      return
    }

    const index = hash(keyInput)
    setActiveIndex(index)

    setTimeout(() => {
      if (operation === "insert") {
        if (!valueInput.trim()) {
          setResult("Please enter a value")
          return
        }

        const existingEntryIndex = hashTable[index].findIndex(entry => entry.key === keyInput)
        const newHashTable = { ...hashTable }

        if (existingEntryIndex >= 0) {
          // Update existing key's value
          newHashTable[index][existingEntryIndex].value = valueInput
          setResult(`Updated value for key "${keyInput}" at index ${index}`)
        } else {
          // Insert new key-value pair
          newHashTable[index] = [...newHashTable[index], { key: keyInput, value: valueInput }]
          setResult(`Inserted key "${keyInput}" with value "${valueInput}" at index ${index}`)
        }

        setHashTable(newHashTable)
        saveToLocalStorage(newHashTable, tableSize)
      } else if (operation === "delete") {
        const newHashTable = { ...hashTable }
        const initialLength = newHashTable[index].length
        newHashTable[index] = newHashTable[index].filter(entry => entry.key !== keyInput)

        if (initialLength !== newHashTable[index].length) {
          setHashTable(newHashTable)
          saveToLocalStorage(newHashTable, tableSize)
          setResult(`Deleted key "${keyInput}" from index ${index}`)
        } else {
          setResult(`Key "${keyInput}" not found at index ${index}`)
        }
      } else if (operation === "search") {
        const entry = hashTable[index].find(entry => entry.key === keyInput)
        setResult(entry 
          ? `Found key "${keyInput}" with value "${entry.value}" at index ${index}` 
          : `Key "${keyInput}" not found`)
      }

      setTimeout(() => {
        setActiveIndex(null)
      }, 1000)
    }, 500)
  }

  const handleClear = () => {
    initializeEmptyTable(tableSize)
    setResult("Hash table cleared")
  }

  return (
    <div className={className}>
      <div className="button-group">
        <label>Operation:</label>
        <div >
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
        <label htmlFor="key">Key:</label>
        <input
          id="key"
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Enter key"
        />
      </div>

      {operation === "insert" && (
        <div className="field-row-stacked">
          <label htmlFor="value">Value:</label>
          <input
            id="value"
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="Enter value"
          />
        </div>
      )}

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

      <div className="sunken-panel">
        <p>{result}</p>
      </div>

      <div className="sunken-panel">
        {Object.keys(hashTable).map((index) => (
          <div
            key={index}
            className={`field-row ${Number.parseInt(index) === activeIndex ? "selected" : ""}`}
          >
            <div className="cell-index">{index}</div>
            <div className="cell-content">
              {hashTable[Number.parseInt(index)].length > 0 ? (
                hashTable[Number.parseInt(index)].map((entry, i) => (
                  <span key={i} className="value-tag">
                    {entry.key}: {entry.value}
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