"use client";

import React, { useState } from "react";
import SearchComponent from "./search/search-component"
import { globalCurrencies } from "./search/data/mock-data"

export default function Home() {

  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  return (
    <main className="bg-gray-100 flex items-center justify-center w-screen h-screen p-6">

      
        <div className="bg-white rounded-md max-w-md p-6 shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-6">
            
              <SearchComponent 
                providedItems={globalCurrencies}
                inputLabel="Async Search" 
                inputDescription="With description and custom results display"
                customDisplay={CustomViewGreen}
                searchStringCondition={(item : any, inputValue: any)=>{
                  return item.name.split(' ').join('').toLowerCase().includes(inputValue.toLowerCase())
                }}
                
                />

              <SearchComponent 
                providedItems={globalCurrencies}
                inputLabel="Sync Search" 
                inputDescription="With default display and search on focus" 
                isSearchOnFocus={true}
                searchStringCondition={(item : any, inputValue: any)=>{
                  return item.name.toLowerCase().includes(inputValue.toLowerCase())
                }}
                synchronousSearching={true}/>

              <SearchComponent 
                providedItems={globalCurrencies}
                inputLabel="Disable Search" 
                inputDescription="With description and custom results display"
                searchStringCondition={(item : any, inputValue: any)=>{
                  return item.name.toLowerCase().includes(inputValue.toLowerCase())
                }} 
                isDisable={true}/>

              <SearchComponent 
                providedItems={globalCurrencies}
                inputLabel="Sync Search With Results" 
                inputDescription="Try to click on checkboxes and results will be displayed"
                isSearchOnFocus={true}
                searchStringCondition={(item : any, inputValue: any)=>{
                  return item.name.toLowerCase().includes(inputValue.toLowerCase())
                }} 
                synchronousSearching={true}
                onSelectedItemsChanged={(items: any)=>{
                  console.log(items)
                  setSelectedItems(items)
                }}/>

                {selectedItems!=undefined ? selectedItems.map((item, index) => (
                    <div key={index}>{item.name}</div>
                )) : null}
          </div>
        </div>
      
     
    </main>
  )
}

function CustomViewGreen(item: any, active: boolean, checkState: any, handleChange: any){
  
    return (
    <div className={(active ? "bg-green-100" : "odd:bg-gray-50 bg-white") + " "}>
        <div className="flex items-center justify-between px-4 py-2 text-sm leading-5 cursor-pointer focus:outline-none text-gray-600">
            <div className="flex flex-col flex-1"><span className="text-sm text-gray-600">{item.emoji} {item.name}</span> <span className="text-sm text-gray-500">Country: {item.code}</span></div>
            <div className="relative pl-3 pointer-events-none">
                <input type="checkbox" 
                  checked={checkState} onChange={handleChange} 
                  className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-checkbox"
                    />

                  
            </div>
        </div>
      </div>);
  
}