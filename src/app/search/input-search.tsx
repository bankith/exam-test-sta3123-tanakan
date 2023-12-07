'use client'

import { forwardRef, useRef, useState, useEffect } from "react";
import {
  autoUpdate,
  size,
  flip,
  offset,
  useId,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
  FloatingPortal
} from "@floating-ui/react";
import SearchItem from "./search-item";
import SearchIcon from "../common/input/searchicon-on-input";
import LoadingOnInput from "../common/input/loading-on-input";
import { globalCurrencies } from "./data/mock-data"
import { data } from "./data"

function InputSearch({onInputValueChanged, searchStringCondition, providedItems=[], providedItemsUrl="", isSearchOnFocus=false, isDisable=false, synchronousSearching=false, customDisplay=null, onSelectedItemsChanged=null} : any) {

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [orginalItems, setOrginalItems] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [itemsCheck, setItemsCheck] = useState<Boolean[]>([]);


  const [isLoading, setIsLoading] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const [selectedItems, setSelectedItems] = useState<any>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip({ padding: 10 }),
      offset(5),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: "12rem",
          });
        },
        padding: 10
      })
    ]
  });

  useEffect(() => {
    
    if(providedItems){
      setOrginalItems(providedItems)
      setItems(providedItems)

      providedItems.forEach((item: any)=>{
        itemsCheck.push(false);
      })
      setItemsCheck(itemsCheck)
    }
    
  }, []);

  useEffect(() => {
    if(orginalItems){
      setItems(orginalItems)
    }

  }, [orginalItems]);

  useEffect(() => {

    if(onSelectedItemsChanged){
      onSelectedItemsChanged(selectedItems)
    }
  }, [selectedItems]);


  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true
  });

  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([role, dismiss, listNav]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value); 
  }


  useEffect(() => {
    if(synchronousSearching == true){
      setItems(orginalItems.filter(filterString));
      return;
    }


    const timeoutId = setTimeout( () => {
      setDebouncedInputValue(inputValue);
    }, 500);
    
   
    return () => { clearTimeout(timeoutId);}    
  }, [inputValue]);

  useEffect(() => {
    if(debouncedInputValue){
        const sleep = (ms: any) => new Promise(
        resolve => setTimeout(resolve, ms));
  
        setIsLoading(true)
        sleep(1000).then(()=>{
            var datas = []
            datas = orginalItems;
            if(providedItemsUrl == "globalCurrenciesAPI"){
              setOrginalItems(globalCurrencies);
              datas = globalCurrencies;
            }
            else if(providedItemsUrl == "fruitsAPI"){
              setOrginalItems(data);
              datas = data;
            }
            

            setIsLoading(false)
            setItems(datas.filter(filterString));
            setOpen(true);
            setActiveIndex(0);
        })
    }else{
        setActiveIndex(null);
        setOpen(false);
    }
  }, [debouncedInputValue]);

  const filterString = (item: any)=>{
    if(!item) return;

    if(searchStringCondition){
      return searchStringCondition(item, inputValue)
    }
  }

  const onItemChecked = (index: number)=>{
    itemsCheck[index] = !itemsCheck[index];
    setItemsCheck(itemsCheck)
    reCalculateSelected();

  }

  const reCalculateSelected = ()=>{
    selectedItems.splice(0, selectedItems.length);

    for (let i = 0; i < itemsCheck.length; i++) {
      if(itemsCheck[i] == true){
        selectedItems.push(orginalItems[i]);
      }
    }
    setSelectedItems([...selectedItems])
  }
  
  return (
    <>
      <div className="relative mt-2 mb-2 rounded-md shadow-sm">
        <SearchIcon /> 
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 border-gray-200 sm:text-sm sm:leading-5 shadow-sm"
          disabled={isDisable}
          {...getReferenceProps({
            ref: refs.setReference,
            onChange,
            value: inputValue,
            placeholder: "Type to begin searching",
            "aria-autocomplete": "list",
            onKeyDown(event) {

              if (
                event.key === "Enter" &&
                activeIndex != null &&
                items[activeIndex]
              ) {
                onItemChecked(activeIndex)

              }else{
                // refs.domReference.current?.focus()
              }
            },
            onFocus(event){
              if(isSearchOnFocus === true){
                  setActiveIndex(null);
                  
                  setOpen(true);
              }
            }
          })}
        />
        <LoadingOnInput isLoading={isLoading} />
        <FloatingPortal>
          {open && (
            <FloatingFocusManager
              context={context}
              initialFocus={-1}
              visuallyHiddenDismiss
            >
              <div
                className="w-full py-1 border border-gray-200 rounded-md shadow-md focus:outline-none"
                {...getFloatingProps({
                  ref: refs.setFloating,
                  style: {
                    ...floatingStyles,
                    background: "white",
                    color: "black",
                    overflowY: "auto",
                    maxHeight: "100px"
                  },
                  onKeyDown(event) {
                    if (
                      event.key === "Enter" &&
                      activeIndex != null &&
                      items[activeIndex]
                    ) {
                      onItemChecked(activeIndex)
                    }
                  },
                })}
              >
                {items.length == 0 ? <span className="ml-4 mt-4 mb-4">no results were found</span> : null}
                {items.map((item, index) => (
                  
                  <SearchItem
                    key={index}
                    checkState={itemsCheck[index]}
                    customDisplay={customDisplay}
                    
                    {...getItemProps({
                      ref(node) {
                        listRef.current[index] = node;
                      },
                      onClick() {
                        onItemChecked(index)
                        // refs.domReference.current?.focus();
                      }
                      
                    })}
                    active={activeIndex === index}
                  >
                    {item}
                  </SearchItem>
                ))}
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      </div>
    </>
  );
}

export default InputSearch;