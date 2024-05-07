
'use client'
import Image from "next/image"
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from "react";
import { ScreenContext } from "@/components/list/screenContext";
import axios from "axios";
import { useRouter } from "next/navigation";


// SavedListEntry.propTypes = {                                        //defines what an object (prop) of SavedListEntry should contain

//     entryData: PropTypes.shape( {
//         title: PropTypes.string,
//         firstItem: PropTypes.string,
//         secondItem: PropTypes.string,
//         thirdItem: PropTypes.string,
//     })
//   };

  //need to add function to restore list 

export default function SavedListEntry({ entryData }) {           
    const [entriesPreview, setPreview] = useState([]);
    const [overflow, setOverflow] = useState(false);
    const [editing, setEditing] = useState(false);
    const router = useRouter();

    const [ nameState, setNameState] = useState(entryData.name);

    useEffect(()=>{
        const listId = entryData.listId;
        axios.post('/api/lists/load-entries', {listId: listId}).then((res) => {
            if (res.data.entries.length > 3) {
                setOverflow(true);
            }

            const onlyThree = res.data.entries.slice(0, 3);
            setPreview(onlyThree);
        
            //console.log(res.data.entries);
    });
    }, []);

    function edit(newName) {
        axios.put('/api/lists/name-list', {listId: entryData.listId, newName: newName}).catch((e)=>{
            console.log(e);
        });
    }

    function save() {
        axios.put('/api/lists/save-list', {listId: entryData.listId, save: !entryData.saved}).then(()=>{
            window.location.reload();
        }).catch((e)=>{
            console.log(e);
        });
    }

    async function selectlist(listId) {
        axios.put('/api/lists/set-current', {listId: listId}).then(()=>{
            router.push("/");
        }).catch((e)=>{
            console.log(e);
        });
    }

    return (
        
            <div className = " m-2 p-4  flex flex-row grow box-border rounded-md shadow-md bg-[color:var(--white)] text-[color:var(--black)] items-center">
                <button 
                    className = "flex flex-col grow m-3"
                    onClick={()=>{
                        if (!editing) {
                            selectlist(entryData.listId);
                        }
                    }}
                >
                    {editing ? 
                        <div className = "text-green-500 text-4xl my-4">
                            <input
                            type="text"
                            name="list-name"
                            id="list-name"
                            defaultValue={(nameState) ? nameState : "Shopping List"}
                            onChange={(event) => { 
                                setNameState( event.target.value);
                            }}
                            className="  appearance-none w-48 bg-slate-100 border-black border-2"
                            />
                        </div>
                    :
                        <div className = "text-green-500 text-4xl my-4">{nameState}</div>
                    }
                        
                    {entriesPreview? 
                    entriesPreview.map((entry, index)=>{
                       return( <li className = "mx-2 text-left" key={index}>{entry.itemText}</li> );
                    }) : null}
                    {overflow ? <div className="text-left ">....</div> : null}
                     
                </button>
                <div className = "flex flex-col">
                    <button className = "mx-4 mb-6">
                        {entryData.saved ? 
                            <Image src = "/delete.svg"
                            width="40" height="40"
                            onClick={()=>save()}
                            alt="save/unsave">
                            </Image>
                        : 
                            <Image src = "/plus.svg"
                                                    width="60" height="60"
                                                    onClick={()=>save()}
                                                    alt="save/unsave">
                            </Image>
                        }
                                                                       
                    </button> 

                    <button>
                        <p className = "border border-black rounded-md" onClick={()=> {
                                if (editing) {
                                    edit(nameState);
                                } 
                                setEditing(!editing);
                                
                                
                            }}>
                            {editing ? <>Update</> : <>Edit</>}
                        </p>
                    </button> 
                </div>
            </div>
        
    )
}
