import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import RefreshIcon from "@mui/icons-material/Refresh";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import FormDialogAdd from "./add";
import FormDialogEdit from "./edit";
import FormDialogDelete from "./delete";
import FormDialogSearch from "./advanceSearch";
import "./headerButton.css";
import { TextField } from "@mui/material";
import FormDialogView from "./analyticsView";
import axios from "axios";

function HeaderButton({ selected, createData, rows }) {
  const PredictButton = styled(Button)({
    color: "#FFFFFF",
    padding: "6px 40px",
    backgroundColor: "#0BA8E6",
    borderColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#14b9fa",
      borderColor: "#FFFFFF",
    },
  });

  const ColorButton = styled(Button)({
    color: "#FFFFFF",
    padding: "6px 12px",
    backgroundColor: "#283d4a",
    borderColor: "#0BA8E6",
    "&:hover": {
      backgroundColor: "#0BA8E6",
      borderColor: "#FFFFFF",
    },
  });

  const ColorButtonA = styled(Button)({
    color: "#FFFFFF",
    padding: "6px 60px",
    backgroundColor: "#283d4a",
    borderColor: "#0BA8E6",
    marginLeft: "130px",
    "&:hover": {
      backgroundColor: "#0BA8E6",
      borderColor: "#FFFFFF",
    },
  });

  const ColorButtonE = styled(Button)({
    color: "#FFFFFF",
    padding: "6px 60px",
    backgroundColor: "#283d4a",
    border: "1px solid",
    borderColor: "#283d4a",
    "&:hover": {
      border: "1px solid",
      borderColor: "#FFFFFF",
    },
  });

  const ColorButtonD = styled(Button)({
    color: "#FFFFFF",
    padding: "6px 50px",
    backgroundColor: "#283d4a",
    borderColor: "#0BA8E6",
    "&:hover": {
      backgroundColor: "#0BA8E6",
      borderColor: "#FFFFFF",
    },
  });

  const ColorButtonR = styled(Button)({
    borderColor: "#0BA8E6",
    marginRight: "8px",
    "&:hover": {
      backgroundColor: "#0BA8E6",
      borderColor: "#FFFFFF",
    },
  });

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [doc_id, setDocId] = React.useState("");
  const [invoice_id, setInvoiceId] = React.useState("");
  const [cust_number, setCustomerNumber] = React.useState("");
  const [buisness_year, setBusinessYear] = React.useState("");

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleClickPredict = () => {
    alert("Prediction Failed");
  };

  const handleDocId = (event) => {
    setDocId(event.target.value);
    console.log(doc_id);
  };
  const handleInvoiceId = (event) => {
    setInvoiceId(event.target.value);
    console.log(invoice_id);
  };

  const handleCustomerNumber = (event) => {
    setCustomerNumber(event.target.value);
    console.log(cust_number);
  };
  const handleBusinessYear = (event) => {
    setBusinessYear(event.target.value);
    console.log(buisness_year);
  };

  const final = {
    doc_id: doc_id,
    invoice_id: invoice_id,
    cust_number: cust_number,
    business_year: buisness_year,
  };

  const handleSearch = () => {
    axios.post("http://127.0.0.1:5000/get_prediction", rows).then((resp) => {
      console.log(resp.data);
      createData(resp.data);
    });
    // console.log(rows);
    // handleClose();
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleClickOpenSearch = () => {
    setOpenSearch(true);
  };
  const handleClickOpenView = () => {
    setOpenView(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseSearch = () => {
    setOpenSearch(false);
  };
  const handleCloseView = () => {
    setOpenView(false);
  };
  return (
    <div>
      <div className="btn-sec">
        <Stack direction="row">
          <div className="btn">
            <ButtonGroup
              size="small"
              variant="outlined"
              aria-label="outlined button group"
              className="btn-grp"
            >
              <PredictButton disabled={!selected.length} onClick={handleSearch}>
                PREDICT
              </PredictButton>

              <ColorButton onClick={handleClickOpenView}>
                ANALYTICS VIEW
              </ColorButton>

              <ColorButton onClick={handleClickOpenSearch}>
                ADVANCE SEARCH
              </ColorButton>

              <ColorButtonR
                size="small"
                variant="outlined"
                className="rf"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <RefreshIcon sx={{ color: blue[800] }} />
              </ColorButtonR>
            </ButtonGroup>

            <TextField
              size="small"
              variant="filled"
              className="search"
              label="Search Customer Id"
              //onChange={(e) => props.setSearchQuery(e.target.value)}
            >
              Search Customer Id
            </TextField>

            <ColorButtonA
              size="small"
              variant="outlined"
              onClick={handleClickOpenAdd}
            >
              ADD
            </ColorButtonA>

            <ColorButtonE
              size="small"
              variant="text"
              onClick={handleClickOpenEdit}
              disabled={selected.length !== 1}
            >
              EDIT
            </ColorButtonE>

            <ColorButtonD
              size="small"
              variant="outlined"
              onClick={handleClickOpenDelete}
              disabled={!selected.length}
            >
              DELETE
            </ColorButtonD>

            <FormDialogView
              openView={openView}
              handleCloseView={handleCloseView}
            />

            <FormDialogSearch
              createData={createData}
              openSearch={openSearch}
              handleCloseSearch={handleCloseSearch}
            />

            <FormDialogAdd openAdd={openAdd} handleCloseAdd={handleCloseAdd} />

            <FormDialogEdit
              selected={selected}
              openEdit={openEdit}
              handleCloseEdit={handleCloseEdit}
            />

            <FormDialogDelete
              selected={selected}
              openDelete={openDelete}
              handleCloseDelete={handleCloseDelete}
            />
          </div>
        </Stack>
      </div>
    </div>
  );
}
export default HeaderButton;
