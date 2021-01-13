import 'package:hive/hive.dart';

class LocalDbService {
  Box _box;

  LocalDbService() {
    _openBox();
  }

  void _openBox() async {
    await Hive.init("SendgramBankDB");
    _box = await Hive.openBox('SendgramBankLocalDB');
  }

  void saveTokens(String JWT, String refreshToken) {
    _box.put("JWT", JWT);
    _box.put("refreshToken", refreshToken);
  }

  String getJWT() {
    return _box.get("JWT");
  }

  String getRefreshToken() {
    return _box.get("refreshToken");
  }
}
