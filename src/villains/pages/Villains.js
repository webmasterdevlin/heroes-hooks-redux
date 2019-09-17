import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewItemForm from "../../shared/components/NewItemForm";
import {Link,} from "@reach/router";
import {
  removeVillain,
  fetchVillains,
  addVillain,
  setVillain
} from "../villain-actions";

export default function Villains() {
  /*part of Redux pattern*/
  const dispatch = useDispatch();
  const { villains, villain, isLoading, error } = useSelector(
    state => state.villainReducer
  );

  /*basic React*/
  const [isShowNewItemForm, setIsShowNewItemForm] = useState(false);
  useEffect(() => {
    dispatch(fetchVillains());
  }, []);

  const showNewItemForm = () => {
    setIsShowNewItemForm(!isShowNewItemForm);
  };
  const onChange = ({ currentTarget: input }) => {
    const newVillain = { ...villain };
    const { name, value } = input;
    newVillain[name] = value;
    dispatch(setVillain(newVillain));
  };

  const onSubmit = async event => {
    event.preventDefault();

    dispatch(await addVillain(villain));
    setIsShowNewItemForm(!isShowNewItemForm);
  };

  const removeItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    dispatch(await removeVillain(id));
  };
  return (
    <>
      <NewItemForm
        isShowNewItemForm={isShowNewItemForm}
        handleOnChange={onChange}
        handleOnSubmit={onSubmit}
        handleShowNewItemForm={showNewItemForm}
      />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <div
            className="spinner-border"
            style={{
              width: "9rem",
              height: "9rem",
              color: "purple"
            }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        villains.map(item => (
          <div key={item.id} className="card mt-3" style={{ width: "auto" }}>
            <div className="card-header">
              <h3 className="card-title">
                {item.firstName} {item.lastName}
              </h3>
              <h5 className="card-subtitle mb-2 text-muted">{item.house}</h5>
              <p className="card-text">{item.knownAs}</p>
            </div>
            <section className="card-body">
              <div className="row">
                <Link
                  to={`/edit-villain/${item.id}`}
                  className="btn btn-primary card-link col text-center"
                >
                  <span className="fas fa-edit  mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => removeItem(item.id, item.firstName)}
                  className="btn btn-outline-danger card-link col text-center"
                >
                  <span className="fas fa-eraser  mr-2" />
                  Delete
                </button>
              </div>
            </section>
          </div>
        ))
      )}
    </>
  );
}
