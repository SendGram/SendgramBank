package tech.sendgram.DashboardForm;

import javafx.beans.property.ReadOnlyStringWrapper;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.AnchorPane;
import tech.sendgram.Main.Control;

import java.io.IOException;

public class DashboardController {

    @FXML
    private AnchorPane rootPane;

    @FXML
    private Button saldo, trans, inviaDenaro, prv;

    @FXML
    private TableView transTable;

    @FXML
    private TableColumn transData, transImporto, transDest, transMit;

    @FXML
    private TextField tx1, tx2, tx3, tx4;


    public void inizialize()
    {

    }

    public void prova(ActionEvent event)
    {
        ObservableList<Person> list = FXCollections.observableArrayList(new Person("Jhon", "Dee"));
        transData.setCellValueFactory(new PropertyValueFactory<Person, String>("name"));
        transTable.setItems(list);
        //list.add(list);

    }


    public void switchElement(ActionEvent actionEvent) throws IOException {
        if (actionEvent.getSource().equals(saldo)) {
            AnchorPane pane = FXMLLoader.load(getClass().getResource("DashboardSaldo.fxml"));
            rootPane.getChildren().setAll(pane);
        } else if (actionEvent.getSource().equals(trans)) {
            AnchorPane pane = FXMLLoader.load(getClass().getResource("DashboardTrans.fxml"));
            rootPane.getChildren().setAll(pane);
        } else if (actionEvent.getSource().equals(inviaDenaro)) {
            AnchorPane pane = FXMLLoader.load(getClass().getResource("DashboardInviaDenaro.fxml"));
            rootPane.getChildren().setAll(pane);
        }
    }

    public void sendMoney(ActionEvent actionEvent) {
    }

}


class Person {
    private String name;
    private String surname;

    public Person(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }
}