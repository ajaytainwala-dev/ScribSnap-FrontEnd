import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NoteContext from "../../Context/Context.jsx";
import AxiosInstance from "../../utils/AxiosInstance.js";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { MdEdit, MdDelete, MdOutlinePushPin,MdPushPin  } from "react-icons/md";
import moment from "moment";
import AddEditNote from "../Inputs/AddEditNote";

const GetNotes = ({
  id,
  title,
  tags,
  description,
  date,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  const [open, setOpen] = useState(false);
  const [pin,setPin]=useState(false);
  const handleOpen = () => {
    setOpen(true);
    // type = "edit";
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          // minWidth: 275,
          borderRadius: "8px",
          boxShadow: "0 3px 8px 0 rgba( 31, 38, 135, 0.37 )",
          minWidth: "300px",
          maxWidth:"300px",
          textWrap:"wrap"
        }}
      >
        <CardContent >
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
              gap: "8px",
              bottom: "10px",
            }}
          >
            <Tooltip title="Edit">
              <IconButton sx={{ color: "black" }}>
                <MdEdit
                  className="cursor-pointer"
                  onClick={() => handleOpen()}
                  style={{ fontSize: "1.2rem" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton sx={{ color: "black" }}>
                <MdDelete
                  className="cursor-pointer"
                  onClick={() => onDelete()}
                  style={{ fontSize: "1.2rem" }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Pin Note">
              <IconButton sx={{ color: "black" }}>
                {pin? <MdPushPin
                  onClick={() =>{
                     onPinNote
                    setPin(false)}}
                  className={`text-xl  cursor-pointer hover:text-primary  text-primary`}
                  style={{ fontSize: "1.2rem" }}
                />: <MdOutlinePushPin
                  onClick={() =>{ 
                    onPinNote
                    setPin(true)}}
                  className={`text-xl  cursor-pointer hover:text-primary  text-primary`}
                  style={{ fontSize: "1.2rem" }}
                />}
               
              </IconButton>
            </Tooltip>
          </CardActions>
          <Typography
            variant="p"
            sx={{
              fontSize: "1.9rem",
              fontWeight: "bolder",
              lineHeight: "1.5rem",
            }}
          >
            {title}
          </Typography>
          <Typography className="pt-2 text-xs text-slate-500">
            {moment(date).format("Do MMM YYYY")}
          </Typography>
          <Typography
            sx={{
              mb: 1.5,
              py: "20px",
              display: "flex",
              alignItems: "space-between",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {tags.map((tag) => (
              <Typography
                key={tag}
                variant="p"
                sx={{
                  px: "auto",
                  py: "3px",
                }}
              >
                {/* #{tag} */}
                <Chip label={`${tag}`} color="success" variant="outlined" />
              </Typography>
            ))}
          </Typography>
          <Typography variant="p" sx={{textWrap:"wrap"}}>
            {description?.length > 60 ? (
            <>
            
                {description.substr(0, 60)}
                {/* <Button variant="text" color="primary">
                  View More
                </Button> */}
            </> 
            ) : (
              description
            )}
          </Typography>
        </CardContent>
      </Card>
      {/* </div> */}

      <AddEditNote
        open={open}
        handleClose={handleClose}
        type={"edit"}
        EditTitle={title}
        editTag={tags}
        EditDescription={description}
        id={id}
      />
    </>
  );
};

export default GetNotes;
