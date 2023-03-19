import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import makeBlockie from "ethereum-blockies-base64";
import { useEffect } from "react";

function ProfileMenu({p, uUname}) {
    const { address, userProfile, handleChain, balance, sendData, username, setUsername, setUserProfile, BlurAddress, chain, connected, blockURL, isSigned, rpcURL, pContract, uploadImage } = p
    const router = useRouter();
    const  paramChain  = router.query.chain
    const x = router.pathname;
    
    const [thisUsername, setThisUsername] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [mesError, setMesError] = useState("")

    useEffect(() => {
        if (!thisUsername && !isEdit)
        setThisUsername(uUname)
    })
    async function handleUsername() {
        const checkData = await sendData({ req: "updateUser", username: thisUsername}, false)
        if (checkData.status) {
            setUsername(checkData.user.username)
            setIsEdit(false)
            setMesError("")
        } else {
            setMesError(checkData.message)
        }

    }
    async function handleUpload(e) {
        if (e[0].type != "image/jpeg" && e[0].type != "image/jpg") {
            setMesError("Image must be jpg or jpeg")
            return
        } else {
            setMesError("")
            const checkData = await uploadImage("updateImage", e[0]);
            if (checkData.status) {
                setUserProfile(`https://welaunch.app/api/user_image/${checkData.user.pic}?update`)
                setMesError("")
            } else {
                setMesError(checkData.message)
            }
        }

    }

    async function handleDelete() {
        const image = makeBlockie(address);
        const checkData = await uploadImage("updateImage", "");
            if (checkData.status) {
                setUserProfile(image)
                setMesError("")
        }

    }
    return (
        <>
                <div className="card welcome-profile">
                                    <div className="card-body pb-0 px-4">
                                        <div className="d-flex gap-3">
                                        <div className="userCount">
                                                <img
                                                    src={userProfile ? userProfile : "/images/profile/unknown.png"}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = "/images/profile/unknown.png";
                                                    }}
                                                    alt="profile"
                                                />
                                                <div className="overlayProfile">
                                                    <div>Change</div>
                                                    <input className="userFile" type="file" onChange={(e) => handleUpload(e.target.files)} />
                                                    <div style={{top:'50%',left:'45%'}}><i className="ri-delete-bin-line" onClick={() => handleDelete()}></i>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="d-flex name username flex-column">
                                               <div className="pb-2">
                                               
                                                {isEdit ? (
                                                   <>
                                                    <input
                                                    className="normal-input py-1 px-2 rounded"
                                                    value={thisUsername}
                                                    onChange={(e) => setThisUsername(e.target.value)
                                                    }
                                                />
                                                            <span style={{ alignSelf: 'center', marginLeft: '5px' }} className="c-pointer" onClick={() => handleUsername()}>
                                                                <i className="ri-check-fill"></i>
                                                            </span>
                                                            <span style={{ alignSelf: 'center', marginLeft: '5px' }} className="c-pointer" onClick={() => setIsEdit(false)}>
                                                                <i className="ri-close-fill"></i>
                                                            </span>
                                                            </>
                                                        ) : (
                                                          <>
                                                            <span className="bold text-white">{uUname}</span>
                                                            <span style={{ alignSelf: 'center', marginLeft: '5px' }} className="c-pointer" onClick={() => setIsEdit(true)}>
                                                                <i className="ri-edit-line"></i>
                                                            </span>
                                                            </>
                                                        )}
                                               </div>
                                               {mesError && ( <div className="text-red pb-2">{mesError}</div>)}
                                                <input className="px-2 py-1 normal-readonly rounded w-100" readonly={true} value={address} />
                                            </div>
                                        </div>
                                        <div className="d-flex pt-4 gap-5 profile-menu">
                                            <div className="d-flex flex-column c-pointer">
                                            <Link href={"/profile?chain="+paramChain}><span className={x == "/profile" ? " bold active" : " bold"}>Profile</span></Link>
                                            {x == "/profile" && (
                                                <span className="actives"></span>
                                            )}
                                            </div>

                                            <div className="d-flex flex-column c-pointer">
                                            <Link href={"/favorite?chain="+paramChain}><span className={x == "/favorite" ? "bold active" : " bold"}>Favorites</span></Link>
                                            {x == "/favorite" && (
                                                <span className="actives"></span>
                                            )}
                                            </div>

                                            <div className="d-flex flex-column c-pointer">
                                            <Link href={"/my-contribution?chain="+paramChain}><span className={x == "/your-contribution" ? " bold active" : " bold"}>My Contributions</span></Link>
                                            {x == "/my-contribution" && (
                                                <span className="actives"></span>
                                            )}
                                            </div>

                                            <div className="d-flex flex-column c-pointer">
                                            <Link href={"/my-pool?chain="+paramChain}><span className={x == "/my-pool" ? " bold active" : " bold"}>My Presales</span></Link>
                                            {x == "/my-pool" && (
                                                <span className="actives"></span>
                                            )}
                                            </div>
                                        
                                           
                                            
                                            
                                        </div>
                                    </div>
                                </div>
            
        </>
    );
}
export default ProfileMenu;
