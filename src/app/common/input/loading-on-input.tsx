'use client'

const LoadingOnInput = ({ isLoading} : any)=> {
    if (isLoading) {
      return (<div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                    <div className="flex items-center justify-center w-5 h-5">
                        <svg className="w-full h-full border-2 border-gray-200 rounded-full border-t-gray-400 animate-spin" viewBox="0 0 24 24"></svg>
                    </div>
                </div>);
    }
    return null;
  }

export default LoadingOnInput;