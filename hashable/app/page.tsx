"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Minus, X, Square } from "lucide-react"

export default function HashTableVisualizer() {
  const [hashTable, setHashTable] = useState<Record<number, string[]>>({})
  const [tableSize, setTableSize] = useState(7)
  const [input, setInput] = useState("")
  const [operation, setOperation] = useState("insert")
  const [result, setResult] = useState("")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Initialize hash table
  useEffect(() => {
    const newHashTable: Record<number, string[]> = {}
    for (let i = 0; i < tableSize; i++) {
      newHashTable[i] = []
    }
    setHashTable(newHashTable)
  }, [tableSize])

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
    setActiveIndex(index)

    setTimeout(() => {
      if (operation === "insert") {
        if (!hashTable[index].includes(input)) {
          const newHashTable = { ...hashTable }
          newHashTable[index] = [...newHashTable[index], input]
          setHashTable(newHashTable)
          setResult(`Inserted "${input}" at index ${index}`)
        } else {
          setResult(`"${input}" already exists at index ${index}`)
        }
      } else if (operation === "delete") {
        if (hashTable[index].includes(input)) {
          const newHashTable = { ...hashTable }
          newHashTable[index] = newHashTable[index].filter((item) => item !== input)
          setHashTable(newHashTable)
          setResult(`Deleted "${input}" from index ${index}`)
        } else {
          setResult(`"${input}" not found at index ${index}`)
        }
      } else if (operation === "search") {
        if (hashTable[index].includes(input)) {
          setResult(`Found "${input}" at index ${index}`)
        } else {
          setResult(`"${input}" not found at index ${index}`)
        }
      }

      setTimeout(() => {
        setActiveIndex(null)
      }, 1000)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#008080] p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-md">
        {/* Title Bar */}
        <div className="bg-[#000080] text-white p-1 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-bold ml-1">HashTable Visualizer</span>
          </div>
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] rounded-none hover:bg-[#c0c0c0]"
            >
              <Minus className="h-3 w-3 text-black" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 ml-1 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] rounded-none hover:bg-[#c0c0c0]"
            >
              <Square className="h-3 w-3 text-black" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 ml-1 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] rounded-none hover:bg-[#c0c0c0]"
            >
              <X className="h-3 w-3 text-black" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-4 flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <label className="block text-sm mb-1 font-bold">Operation:</label>
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]">
                  <SelectItem value="insert">Insert</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="search">Search</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 font-bold">Value:</label>
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white focus:ring-0 focus:ring-offset-0"
                placeholder="Enter value"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleOperation}
                className="bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] rounded-none"
              >
                Execute
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1 font-bold">Table Size:</label>
            <Select value={tableSize.toString()} onValueChange={(value) => setTableSize(Number.parseInt(value))}>
              <SelectTrigger className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select table size" />
              </SelectTrigger>
              <SelectContent className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]">
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="11">11</SelectItem>
                <SelectItem value="13">13</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <div className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white p-2 h-10">
              <p className="text-sm">{result}</p>
            </div>
          </div>

          <div className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white p-2">
            <div className="grid gap-2">
              {Object.keys(hashTable).map((index) => (
                <div
                  key={index}
                  className={`flex items-center ${Number.parseInt(index) === activeIndex ? "bg-[#000080] text-white" : ""}`}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] mr-2">
                    {index}
                  </div>
                  <div className="flex-1 min-h-10 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] p-2 flex flex-wrap gap-2">
                    {hashTable[Number.parseInt(index)].length > 0 ? (
                      hashTable[Number.parseInt(index)].map((item, i) => (
                        <span
                          key={i}
                          className="bg-white border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-2 py-1 text-sm"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-[#808080]">Empty</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#c0c0c0] p-1 border-t border-t-[#808080]">
          <div className="text-xs">Ready</div>
        </div>
      </div>
    </div>
  )
}

