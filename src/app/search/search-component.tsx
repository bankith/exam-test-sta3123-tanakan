'use client'

import React, { useState, useEffect } from "react";
import {useFloating, offset} from '@floating-ui/react';
import InputSearch from "./input-search";

export default function SearchComponent({ inputLabel, inputDescription, isSearchOnFocus, providedItems, providedItemsUrl, isDisable, synchronousSearching, searchStringCondition, customDisplay, onSelectedItemsChanged }: any) {

    return (
        <div>
            <p className="block text-sm font-small leading-6 text-gray-900">{inputLabel}</p>
            
            <InputSearch 
            providedItems={providedItems}
            isSearchOnFocus={isSearchOnFocus} 
            isDisable={isDisable} 
            providedItemsUrl={providedItemsUrl}
            synchronousSearching={synchronousSearching} 
            searchStringCondition={searchStringCondition}
            customDisplay={customDisplay}
            onSelectedItemsChanged={onSelectedItemsChanged}/>
            



            <p className="block text-sm font-small leading-6 text-gray-900">{inputDescription}</p>

        </div>
    );
}

