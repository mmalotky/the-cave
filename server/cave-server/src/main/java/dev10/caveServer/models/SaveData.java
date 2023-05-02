package dev10.caveServer.models;

import java.sql.Timestamp;

public class SaveData {
    private int id;
    private String user;
    private Timestamp saveDate;
    private String saveName;
    private String level;

    public SaveData(){}

    public SaveData(String user, Timestamp saveDate, String saveName, String level) {
        this.user = user;
        this.saveName = saveName;
        this.level = level;
        this.saveDate = saveDate;
    }

    public SaveData(int id, String user, Timestamp saveDate, String saveName, String level) {
        this.id = id;
        this.user = user;
        this.saveName = saveName;
        this.level = level;
        this.saveDate = saveDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getSaveName() {
        return saveName;
    }

    public void setSaveName(String saveName) {
        this.saveName = saveName;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Timestamp getSaveDate() {
        return saveDate;
    }

    public void setSaveDate(Timestamp saveDate) {
        this.saveDate = saveDate;
    }
}
