package tech.sendgram.DashboardForm;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import tech.sendgram.Main.Conto;


import java.io.IOException;


public class DashboardController {
    @FXML
    private AnchorPane rootPane;

    @FXML
    private Button saldo, trans, inviaDenaro;

    @FXML
    private Label nome, labelSaldo;

    @FXML
    private TextField dest, insertM;

    @FXML
    private TableView table;

    @FXML
    private TableColumn data, importo, mittente, destinatario;

    //String[][] t = {{"2019-11-25", "500", "Ale", "Bose"}, {"2019-11-26", "800", "Ale", "caldo"}};
    private ObservableList<Person> list = FXCollections.observableArrayList();


    @FXML
    public void initialize() {
        Conto.labelNome = nome;
        Conto.labelSaldo = labelSaldo;
        Conto.refreshSaldo();
        Conto.refreshNome();
        for (String[] a : Conto.getTransazioni()) {
            list.add(new Person(a[0], a[1], a[2], a[3]));
        }
        data.setCellValueFactory(new PropertyValueFactory<Person, String>("data"));
        importo.setCellValueFactory(new PropertyValueFactory<Person, String>("importo"));
        mittente.setCellValueFactory(new PropertyValueFactory<Person, String>("mittente"));
        destinatario.setCellValueFactory(new PropertyValueFactory<Person, String>("destinatario"));
        table.setItems(list);
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
        float a = Float.parseFloat(insertM.getText());
        String b = dest.getText();
        Conto.newTrans(a, b);
    }

}
