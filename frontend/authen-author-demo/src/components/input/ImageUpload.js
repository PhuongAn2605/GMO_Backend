import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { setAvatar } from "../../redux/auth/auth.actions";
import ButtonForm from '../button/Button.comonent';
import './ImageUpload.styles.css';

const ImageUpload = props => {
    // console.log(props.setAvatar);
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState();

    const filePickerRef = useRef();

    useEffect(() => {
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if(event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }else{
            setIsValid(false);
            fileIsValid = false;
        }

        // props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
        props.setAvatar(filePickerRef.current.value);
    }

    return (
        <div className="form-control">
            <input 
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none'}}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <ButtonForm type="button" title="PICK IMAGE" onClick={pickImageHandler} color="success"/>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setAvatar: (avatar) => dispatch(setAvatar(avatar))
  });

export default connect(null, mapDispatchToProps)(ImageUpload);