'use client'

import { forwardRef, useRef, useState, useEffect } from "react";
import {
    useId,
  } from "@floating-ui/react";

const SearchItem = forwardRef(({ children, active, checkState, customDisplay, ...rest } : any, ref) => {
  
   

    const handleChange = (event : any) => {
    };
    
      
    const id = useId();
    return (
        
      <div
        ref={ref}
        // role="option"
        id={id}
        // aria-selected={active}
        {...rest}
        
        style={{
        //   cursor: "default",
          ...rest.style
        }}
      >

        {customDisplay!=null ? customDisplay(children, active, checkState, handleChange) :  

          <div className={(active ? "bg-blue-100" : "odd:bg-gray-50 bg-white") + " "}>
            <div className="flex items-center justify-between px-4 py-2 text-sm leading-5 cursor-pointer focus:outline-none text-gray-600">
                <span className="flex-1">{children.name}</span>
                <div className="relative pl-3 pointer-events-none">
                    <input type="checkbox" 
                      checked={checkState} onChange={handleChange} 
                      className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-checkbox"
                        />

                      
                </div>
            </div>
          </div>
        }


      </div>
    );
  });

SearchItem.displayName = 'SearchItem';
export default SearchItem;