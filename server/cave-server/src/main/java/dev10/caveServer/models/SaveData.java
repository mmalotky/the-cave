package dev10.caveServer.models;

public class SaveData {
    private int id;
    private String user;
    private String saveName;
    private String level;

    public SaveData(){}

    public SaveData(String user, String saveName, String level) {
        this.user = user;
        this.saveName = saveName;
        this.level = level;
    }

    public SaveData(int id, String user, String saveName, String level) {
        this.id = id;
        this.user = user;
        this.saveName = saveName;
        this.level = level;
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
}
