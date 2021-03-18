import 'package:hive/hive.dart';

class LocalDbService {
  static Box _box;

  Future<void> _openBox() async {
    if (_box == null) {
      Hive.init("SendgramBankDB");
      _box = await Hive.openBox('SendgramBankLocalDB');
    }
  }

  void saveTokens(String jwt, String refreshToken) async {
    saveJwt(jwt);
    saveRefreshJwt(refreshToken);
  }

  void saveJwt(String jwt) {
    _box.put("JWT", jwt);
  }

  void saveRefreshJwt(String refreshToken) {
    _box.put("refreshToken", refreshToken);
  }

  Future<String> getJWT() {
    return _box.get("JWT");
  }

  Future<String> getRefreshToken() async {
    if (_box == null) await _openBox();
    return _box.get("refreshToken");
  }
}
